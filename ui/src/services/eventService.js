import { requestAPI } from "../utils/request";
import { BASE_URL } from "../constants/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all events

// Fetch events from JSON server
export const fetchEvents = createAsyncThunk("events/fetchEvents", async (_, { rejectWithValue }) => {
  try {
    const response = await requestAPI("GET", BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return rejectWithValue(error.response.data);
  }
});

export const fetchEventById = createAsyncThunk("events/fetchEventById", async (id, {rejectWithValue}) => {
  try {
    const response = await requestAPI('GET', `${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by Id:', error);
    return rejectWithValue(error.response.data);
  }
});

export const createEvent = createAsyncThunk("events/createEvent", async (eventPostData, {rejectWithValue}) => {
  try {
    const response = await requestAPI("POST", BASE_URL, eventPostData);
    return response.data;
  } catch (error) {
    console.error("Error creating a event", error);
    return rejectWithValue(error.response.data);
  }
});

export const editEvent = createAsyncThunk('events/editEvent', async ({ id, eventData }, { rejectWithValue }) => {
  try {
    const response = await requestAPI('PUT', `${BASE_URL}/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error("Error updating an event", error);
    return rejectWithValue(error.response.data);
  }
});

export const deleteEvent = createAsyncThunk('events/deleteEvent', async (id, { rejectWithValue }) => {
  try {
    await requestAPI('DELETE', `${BASE_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting an event", error);
    return rejectWithValue(error.response.data);
  }
});