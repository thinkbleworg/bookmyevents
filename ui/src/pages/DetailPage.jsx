import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Box,
  IconButton,
  CardActions,
  CardHeader
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { fetchEventById, deleteEvent } from "../services/eventService";
import { clearSelectedEvent, setSelectedEvent } from '../redux/slices/eventSlice';
import Navbar from '../components/Navbar';

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedEvent, loading, error } = useSelector((state) => state.events);

  const handleEdit = (event) => {
    dispatch(setSelectedEvent(event));
    navigate(`/event/${event.id}/edit`);
  };

  const handleDelete = (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(event.id));
      navigate('/');
    }
  };

  const backToHome = (
    <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
      Back to Home
    </Button>
  );

  const errorElement = (error) => (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" color="error">
        Error: {error}
      </Typography>
      {backToHome}
    </Container>
  );

  useEffect(() => {
    dispatch(fetchEventById(id));

    // Clear details when unmounting to prevent stale data
    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return errorElement();
  }

  if (!selectedEvent) {
    return errorElement("Event not found!");
  }

  return (
    <>
      <Navbar noButtons={true} />
      <Container maxWidth="md" sx={{ mt: 5, pb: 5 }}>
        <Card>
          <CardHeader
            title={selectedEvent.payload.items[0].event_name}
            subheader={`${selectedEvent.payload.event_date} ${selectedEvent.payload.event_time}`}
            action={
              <>
                <IconButton onClick={handleEdit.bind(null, selectedEvent)} color="primary" size="large" sx={{ mr: 1 }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={handleDelete.bind(null, selectedEvent)} color="error" size="large">
                  <Delete />
                </IconButton>
              </>
            }
            >            
          </CardHeader>
          <CardMedia
            component="img"
            height="300"
            image={"https://placehold.co/400"}
            alt={selectedEvent.payload.items[0].event_name}
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {selectedEvent.payload.items[0].event_description}
            </Typography>

            <Typography variant="subtitle1" color="primary" sx={{ mb: 1 }}>
              📅 Date: {selectedEvent.payload.event_date}
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              📍 Location: {selectedEvent.payload.location || 'To be announced'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
              Book Event
            </Button>
            <Button variant="outlined" component={Link} to="/">
              Back to Home
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};

export default DetailPage;