import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../services/eventService";
import { Container, Button, Box } from '@mui/material';
import CardView from "../components/CardView";
import ListView from "../components/ListView";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, loading, error } = useSelector((state) => state.events);
  const [viewType, setViewType] = useState("card");

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <Navbar viewType={viewType} setViewType={setViewType} />
      <Container sx={{ mt: 3 }}>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/event")}
            sx={{ my: 3 }}
          >
            Create Event
          </Button>
        </Box>
        {error && <p>Error: {error}</p>}
        {loading ? (
          <p>Loading events...</p>
        ) : viewType === "card" ? (
          <CardView events={events} />
        ) : (
          <ListView events={events} />
        )}
      </Container>
    </>
  );
};

export default LandingPage;
