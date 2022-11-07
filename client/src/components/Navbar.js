import React, { Component } from 'react';
import { Link }  from 'react-router-dom/';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';

// MUI imports
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

// icons
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import Notifications from "@mui/icons-material/Notifications"


class Navbar extends Component {
  render() {
    const { authenticated } =  this.props
    return (
      <AppBar>
        {authenticated ? (
          <>
            <Toolbar className='nav-container'>
              <MyButton tip='Create a Post'>
                <AddIcon />
              </MyButton>
              <Link to='/'>
                <MyButton tip='Home'>
                  <HomeIcon />
                </MyButton>
              </Link>
              <MyButton tip='Notifications'>
                <Notifications />
              </MyButton>
            </Toolbar>
          </>
        ) : (
          <>
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
          </>
        )}
      </AppBar>
    )
  }
}

Navbar.propTypes = ({
  authenticated: PropTypes.bool.isRequired
});

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);