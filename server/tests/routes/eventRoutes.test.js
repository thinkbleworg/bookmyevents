const request = require("supertest");
const express = require("express");
const fs = require("fs");
const router = require("../../routes/eventRoutes");
const mockData = require("../mockData");

const app = express();

const BASE_URL = "/api/events";

let cloneMockData = [...mockData];

app.use(express.json());
app.use(BASE_URL, router);

// Mock fs.readFileSync and fs.writeFileSync
jest.mock("fs");

describe("EventRoutes test cases", () => {
  beforeEach(() => {
    cloneMockData = [...mockData];
    fs.readFileSync.mockImplementation(() => JSON.stringify(cloneMockData));
    fs.writeFileSync.mockImplementation((_, data) => {
      cloneMockData = JSON.parse(data);
    });
  });

  test("Should return all events", async () => {
    const res = await request(app).get(BASE_URL);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].payload.items[0].event_name).toBe("Event One");
  });

  test("Should return an event by ID", async () => {
    const res = await request(app).get(`${BASE_URL}/1`);
    expect(res.status).toBe(200);
    expect(res.body.payload.items[0].event_name).toBe("Event One");
  });

  test("Should return 404 if event not found", async () => {
    const res = await request(app).get(`${BASE_URL}/5`);
    expect(res.status).toBe(404);
    expect(res.text).toBe("Event not found");
  });

  test("Should create a new event", async () => {
    const newEvent = {
      type: "CREATED",
      city: "Mumbai",
      payload: {
        event_date: "20-07-2025",
        event_time: "10:00",
        items: [
          {
            event_name: "Event Three",
            event_title: "IGNITE YOUR ENTREPRENEURIAL SPIRIT - 3",
            sell_price: "100",
            orig_price: "100",
          },
        ],
      },
    };
    const res = await request(app).post(BASE_URL).send(newEvent);
    expect(res.status).toBe(201);
    expect(res.body.payload.items[0].event_name).toBe("Event Three");
    expect(res.body.id).toBe(3);
  });

  test("Should update an existing event", async () => {
    const updatedEvent = {
      type: "Updated",
      city: "Pune",
      payload: {
        event_date: "12-07-2025",
        event_time: "10:00",
        items: [
          {
            event_name: "Updated Event One",
            event_title: "IGNITE YOUR ENTREPRENEURIAL SPIRIT",
            sell_price: "100",
            orig_price: "100",
          },
        ],
      },
    };
    const res = await request(app).put(`${BASE_URL}/1`).send(updatedEvent);
    expect(res.status).toBe(200);
    expect(res.body.payload.items[0].event_name).toBe("Updated Event One");
  });

  test("Should return 404 if event not found", async () => {
    const updatedEvent = {
      type: "Updated",
      city: "Pune",
      payload: {
        event_date: "12-07-2025",
        event_time: "10:00",
        items: [
          {
            event_name: "Invalid Event",
            event_title: "IGNITE YOUR ENTREPRENEURIAL SPIRIT",
            sell_price: "100",
            orig_price: "100",
          },
        ],
      },
    };
    const res = await request(app).put(`${BASE_URL}/5`).send(updatedEvent);
    expect(res.status).toBe(404);
    expect(res.text).toBe("Event not found");
  });

  test("Should delete an event", async () => {
    const res = await request(app).delete(`${BASE_URL}/2`);
    expect(res.status).toBe(204);
    const resFetchAll = await request(app).get(BASE_URL);
    expect(resFetchAll.status).toBe(200);
    expect(resFetchAll.body.length).toBe(1);
  });

  test("Should return 404 if event not found", async () => {
    const res = await request(app).delete(`${BASE_URL}/5`);
    expect(res.status).toBe(404);
    expect(res.text).toBe("Event not found");
  });

  test("Should return 404 for invalid route", async () => {
    const res = await request(app).get("/nonexistent-route");
    expect(res.status).toBe(404);
  });
});
