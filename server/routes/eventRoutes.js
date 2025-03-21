const fs = require("fs");
const express = require('express');

const router = express.Router();

const DATA_FILE = "data/events.json";

// Load data from events.json
const loadEvents = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

// Get all events
router.get("/", (req, res) => {
  const events = loadEvents();
  res.json(events);
});

// Get event by ID
router.get("/:id", (req, res) => {
  const events = loadEvents();
  const event = events.find((e) => e.id === parseInt(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).send("Event not found");
  }
});

// Add new event
router.post("/", (req, res) => {
  const events = loadEvents();
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
  res.status(201).json(newEvent);
});

// Update event by ID
router.put("/:id", (req, res) => {
  const events = loadEvents();
  const index = events.findIndex((e) => e.id === parseInt(req.params.id));
  if (index !== -1) {
    events[index] = { ...events[index], ...req.body };
    fs.writeFileSync(DATA_FILE, JSON.stringify(events, null, 2));
    res.json(events[index]);
  } else {
    res.status(404).send("Event not found");
  }
});

// Delete event by ID
router.delete("/:id", (req, res) => {
  let events = loadEvents();
  const filteredEvents = events.filter((e) => e.id !== parseInt(req.params.id));
  if (filteredEvents.length !== events.length) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(filteredEvents, null, 2));
    res.status(204).send();
  } else {
    res.status(404).send("Event not found");
  }
});

module.exports = router;