import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEvent, fetchEvents } from '../services/eventService';
import { setSelectedEvent } from "../redux/slices/eventSlice";
import { useToast } from '../context/ToastContext';

const CardView = ({ events }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();


  const handleEdit = (event) => {
    dispatch(setSelectedEvent(event));
    navigate(`/event/${event.id}/edit`);
  };

  const handleDelete = async (event) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await dispatch(deleteEvent(event.id)).unwrap();
        showToast("Event deleted successfully!", "success");
        
        await dispatch(fetchEvents());
      } catch (error) {
        console.error("Error deleting event:", error);
        showToast("Error deleting event", "error");
      }
    }
  };

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {events.map((event) => (
        <Grid size={{ xs: 2, sm: 4, md: 4 }} key={event.id}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={"https://placehold.co/300"}
              alt={event.payload.items[0].event_name}
            />
            <CardContent>
              <Typography variant="h5">{event.payload.items[0].event_name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {event.payload.items[0].event_description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleEdit.bind(null, event)} color="primary" size="small" sx={{ mr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton onClick={handleDelete.bind(null, event)} color="error" size="small">
                <Delete />
              </IconButton>
              <Button component={Link} to={`/event/${event.id}`} variant="contained" size="small" sx={{marginLeft: 'auto'}}>
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardView;