import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, IconButton, Stack } from '@mui/material';
import { Brightness4, Brightness7, ViewModule, ViewList } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const Navbar = ({ viewType = "card", setViewType = () => {}, noButtons = false}) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "#fff" }}>
          BookYourEvents
        </Typography>

        {!noButtons && (<Stack direction="row" spacing={1}>
          <IconButton
            color={viewType === 'card' ? 'secondary' : 'default'}
            onClick={() => setViewType('card')}
          >
            <ViewModule />
          </IconButton>
          <IconButton
            color={viewType === 'list' ? 'secondary' : 'default'}
            onClick={() => setViewType('list')}
          >
            <ViewList />
          </IconButton>
        </Stack>
        )}

        <IconButton sx={{ ml: 2 }} onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;