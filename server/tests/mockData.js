const mockEvents = [
  {
    id: 1,
    type: "CREATED",
    city: "Mumbai",
    payload: {
      event_date: "12-07-2025",
      event_time: "10:00",
      items: [
        {
          event_name: "Event One",
          event_title: "IGNITE YOUR ENTREPRENEURIAL SPIRIT",
          sell_price: "100",
          orig_price: "100",
        },
      ],
    },
  },
  {
    id: 2,
    type: "CREATED",
    city: "Pune",
    payload: {
      event_date: "10-07-2025",
      event_time: "10:00",
      items: [
        {
          event_name: "Event Two",
          event_title: "IGNITE YOUR ENTREPRENEURIAL SPIRIT 2",
          sell_price: "100",
          orig_price: "100",
        },
      ],
    },
  },
];

module.exports = mockEvents;