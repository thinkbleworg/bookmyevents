import dayjs from "dayjs";

export const flattenEventData = (selectedEvent) => {
    if (!selectedEvent || !selectedEvent.payload?.items?.length) {
      return null;
    }
  
    const eventData = selectedEvent.payload.items[0];
  
    return {
      id: selectedEvent.id || "",
      ownerId: selectedEvent.owner_id || "123663",
      city: selectedEvent.city || "",
      event_date: dayjs(selectedEvent.payload.event_date, "DD-MM-YYYY").format("YYYY-MM-DD"),
      event_time: selectedEvent.payload.event_time || "",
      image: selectedEvent.payload.image || "https://placehold.co/400",
      event_id: eventData.event_id || Date.now().toString(),
      event_name: eventData.event_name || "",
      event_title: eventData.event_title || "",
      event_description: eventData.event_description || "",
      loc_address: {
        name: eventData.location.loc_address.name || "",
        address_1: eventData.location.loc_address.address_1 || "",
        address_2: eventData.location.loc_address.address_2 || "",
        city_name: eventData.location.loc_address.city_name || "",
        state_id: eventData.location.loc_address.state_id || "",
        state_short_name: eventData.location.loc_address.state_short_name || "",
        postal_code: eventData.location.loc_address.postal_code || "",
        phone_number: eventData.location.loc_address.phone_number || "",
        country_name: eventData.location.loc_address.country_name || "",
        country_code: eventData.location.loc_address.country_code || "",
        is_commercial: eventData.location.loc_address.is_commercial || false,
        company_name: eventData.location.loc_address.company_name || "",
      },
      loc_geometry: {
        type: eventData.location.loc_geometry.type || "Point",
        coordinates: eventData.location.loc_geometry.coordinates || [0, 0],
      },
      selling_price: eventData.sell_price?.replace("$", "") || "",
      original_price: eventData.orig_price || "",
      published_at: selectedEvent.published_at || dayjs().format("DD-MM-YYYY"),
    };
  };

  export const transformToPayload = (formData, isEdit) => {
    return {
      id: formData.id ? Number(formData.id) : Date.now(),
      type: isEdit ? "UPDATED" : "CREATED",
      owner_id: formData.ownerId,
      city: formData.city,
      payload: {
        event_date: dayjs(formData.event_date, "YYYY-MM-DD").format("DD-MM-YYYY"),
        event_time: formData.event_time,
        image: formData.image,
        items: [
          {
            event_id: formData.event_id,
            event_name: formData.event_name,
            event_title: formData.event_title,
            event_description: formData.event_description,
            location: {
              loc_address: { ...formData.loc_address },
              loc_geometry: {},
            },
            sell_price: `$${formData.selling_price}`,
            orig_price: formData.original_price,
          },
        ],
      },
      published_at: dayjs().format("DD-MM-YYYY"),
    };
  };