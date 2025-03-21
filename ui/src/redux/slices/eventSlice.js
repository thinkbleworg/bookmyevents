import { createSlice } from "@reduxjs/toolkit";
import { fetchEvents, fetchEventById, createEvent, editEvent, deleteEvent } from "../../services/eventService";

const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState: initialState,
  reducers: {
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },

    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching events";
      })

      // Fetch Event By Id
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching event details";
      })

      // Create Event
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error creating event";
      })

      // Edit Event By Id
      .addCase(editEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.events.findIndex((event) => event.id === action.payload.id);
        if (idx !== -1) {
          state.events[idx] = action.payload;
        }
      })
      .addCase(editEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error editing event details";
      })

      // Delete Event By Id
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter((event) => event.id !== action.payload.id);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error deleting an event";
      })
  }
});

export const { setSelectedEvent, clearSelectedEvent } = eventSlice.actions;

export default eventSlice.reducer;
