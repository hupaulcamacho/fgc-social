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
          <Button color="inherit">
            <Link to='/login'>Login</Link>
          </Button>
          <Button color="inherit">
            <Link to='/'>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to='/signup'>Signup</Link>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default Navbar