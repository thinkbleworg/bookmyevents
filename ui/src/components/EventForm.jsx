import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Box,
  InputAdornment,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { clearSelectedEvent } from '../redux/slices/eventSlice';
import { createEvent, editEvent, fetchEventById } from "../services/eventService";
import { useToast } from '../context/ToastContext';
import { CITY_OPTIONS } from '../constants/constants';
import { transformToPayload, flattenEventData } from '../utils/processData';

const EventForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const { selectedEvent, loading } = useSelector((state) => state.events) || {};

  const [formData, setFormData] = useState({
    ownerId: '123663',
    city: '',
    event_date: '',
    event_time: '',
    image: 'https://placehold.co/400', // Default placeholder
    event_id: Date.now().toString(),
    event_name: '',
    event_title: '',
    event_description: '',
    loc_address: {
      name: '',
      address_1: '',
      address_2: '',
      city_name: '',
      state_id: '',
      state_short_name: '',
      postal_code: '',
      phone_number: '',
      country_name: '',
      country_code: '',
      is_commercial: false,
      company_name: '',
    },
    loc_geometry: {
      type: 'Point',
      coordinates: [0, 0],
    },
    selling_price: '',
    original_price: '',
    published_at: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "selling_price" || name === "original_price") {
      if (!/^\d*\.?\d*$/.test(value)) {
        return; // Ignore invalid characters
      }
    }

    if (name.startsWith("loc_address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        loc_address: { ...prev.loc_address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDateTimeChange = (date) => {
    setFormData({
      ...formData,
      event_date: dayjs(date).format("YYYY-MM-DD"),
      event_time: dayjs(date).format("HH:mm"),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.event_name.trim()) {
      showToast("Event name is required", "error");
      return;
    }

    // Transform to required format
    const payload = transformToPayload(formData, isEdit);

    try {
      if (isEdit) {
        await dispatch(editEvent({ id, eventData: payload })).unwrap();
        showToast("Event updated successfully!", "success");
      } else {
        await dispatch(createEvent(payload)).unwrap();
        showToast("Event created successfully!", "success");
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      showToast("Error occurred while processing request", "error");
    }
  };

  useEffect(() => {
    if (isEdit && selectedEvent) {
        const transformedData = flattenEventData(selectedEvent);
        if (transformedData) {
          setFormData(transformedData);
        }
    }
  }, [selectedEvent, isEdit]);

  useEffect(() => {
    if (isEdit && !loading && (!selectedEvent || selectedEvent.event_id !== id)) {
      dispatch(fetchEventById(id));
    }
    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [dispatch, id, isEdit]);

  if (isEdit && loading) {
    return <div>Loading event details...</div>;
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        {isEdit ? "Edit Event" : "Create Event"}
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              label="Owner ID"
              name="ownerId"
              value="123663"
              disabled
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <TextField
              select
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              required
            >
              {CITY_OPTIONS.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid size={12}>
            <DateTimePicker
              label="Event Date & Time"
              disablePast
              format="DD-MM-YYYY hh:mm A"
              value={
                formData.event_date && formData.event_time
                  ? dayjs(`${formData.event_date} ${formData.event_time}`, "YYYY-MM-DD HH:mm")
                  : null
              }
              onChange={handleDateTimeChange}
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Event ID"
              name="event_id"
              value={formData.event_id}
              disabled
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Event Name"
              name="event_name"
              value={formData.event_name}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Event Title"
              name="event_title"
              value={formData.event_title}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Event Description"
              name="event_description"
              value={formData.event_description}
              onChange={handleInputChange}
              fullWidth
              multiline
              required
              rows={4}
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Address 1"
              name="loc_address.address_1"
              value={formData.loc_address.address_1}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Selling Price"
              name="selling_price"
              value={formData.selling_price}
              onChange={handleInputChange}
              fullWidth
              required
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">$</InputAdornment>,
                },
              }}
            />
          </Grid>

          <Grid size={6}>
            <TextField
              label="Original Price"
              name="original_price"
              value={formData.original_price}
              onChange={handleInputChange}
              fullWidth
              required
              slotProps={{
                input: {
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                },
              }}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isEdit ? "Update Event" : "Create Event"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EventForm;