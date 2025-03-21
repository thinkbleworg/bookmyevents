import eventReducer, {
  setSelectedEvent,
  clearSelectedEvent,
} from "../../redux/slices/eventSlice";
import {
  fetchEvents,
  fetchEventById,
  createEvent,
  editEvent,
  deleteEvent,
} from "../../services/eventService";

const initialState = {
  events: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const mockData = {
  id: 1,
  event_name: "Music Night",
  city: "Mumbai",
};

describe("eventSlice Reducers", () => {
  test("should return the initial state", () => {
    expect(eventReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle setSelectedEvent", () => {
    const action = setSelectedEvent(mockData);
    const nextState = eventReducer(initialState, action);
    expect(nextState.selectedEvent).toEqual(mockData);
  });

  test("should handle clearSelectedEvent", () => {
    const action = clearSelectedEvent();
    const prevState = { ...initialState, selectedEvent: mockData };
    const nextState = eventReducer(prevState, action);
    expect(nextState.selectedEvent).toBeNull();
  });
});

describe("eventSlice Async Reducers", () => {
  test("should handle fetchEvents.pending", () => {
    const action = { type: fetchEvents.pending.type };
    const nextState = eventReducer(initialState, action);
    expect(nextState.loading).toBe(true);
  });

  test("should handle fetchEvents.fulfilled", () => {
    const action = {
      type: fetchEvents.fulfilled.type,
      payload: [mockData],
    };
    const nextState = eventReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.events).toEqual([mockData]);
  });

  test("should handle fetchEvents.rejected", () => {
    const action = {
      type: fetchEvents.rejected.type,
      payload: "Error fetching events",
    };
    const nextState = eventReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe("Error fetching events");
  });

  test("should handle fetchEventById.fulfilled", () => {
    const action = {
      type: fetchEventById.fulfilled.type,
      payload: mockData,
    };
    const nextState = eventReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.selectedEvent).toEqual(mockData);
  });

  test("should handle createEvent.fulfilled", () => {
    const action = {
      type: createEvent.fulfilled.type,
      payload: mockData,
    };
    const nextState = eventReducer(initialState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.events).toContainEqual(mockData);
  });

  test("should handle editEvent.fulfilled", () => {
    const prevState = {
      ...initialState,
      events: [mockData],
    };
    const updatedEvent = { ...mockData, event_name: "Updated Event" };
    const action = {
      type: editEvent.fulfilled.type,
      payload: updatedEvent,
    };
    const nextState = eventReducer(prevState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.events[0]).toEqual(updatedEvent);
  });

  test("should handle deleteEvent.fulfilled", () => {
    const prevState = {
      ...initialState,
      events: [mockData],
    };
    const action = {
      type: deleteEvent.fulfilled.type,
      payload: mockData.id,
    };
    const nextState = eventReducer(prevState, action);
    expect(nextState.loading).toBe(false);
    expect(nextState.events).toHaveLength(0);
  });
});
