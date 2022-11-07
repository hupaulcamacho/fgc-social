import React, { Component } from 'react';
import { Link }  from 'react-router-dom/';

// MUI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          <Link to='/'>
              <Button color="inherit">
                Home
              </Button>
          </Link>
          <Link to='/login'>
              <Button color="inherit">
                Login
              </Button>
          </Link>
          <Link to='/signup'>
              <Button color="inherit">
                Signup
              </Button>
          </Link>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar