import React from 'react';
import { List, ListItemButton, ListItemText, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteEvent, fetchEvents } from "../services/eventService";
import { setSelectedEvent } from '../redux/slices/eventSlice';

const ListView = ({ events }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (event) => {
    dispatch(setSelectedEvent(event));
    navigate(`/event/${event.id}/edit`);
  };

  const handleDelete = (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(event.id));
      dispatch(fetchEvents());
    }
  };

  return (
    <List component="nav" aria-label="event list">
      {events.map((event) => (
        <React.Fragment key={event.id}>
          <ListItemButton component={Link} to={`/event/${event.id}`}>
            <ListItemText
              primary={event.payload.items[0].event_name}
              secondary={`Date: ${event.payload.event_date}`}
            />
            <IconButton onClick={handleEdit.bind(null, event)} color="primary" size="small" sx={{ mr: 1 }}>
              <Edit />
            </IconButton>
            <IconButton onClick={handleDelete.bind(null, event)} color="error" size="small">
              <Delete />
            </IconButton>
          </ListItemButton>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ListView;