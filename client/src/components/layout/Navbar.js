import React, { Component } from "react";
import { Link } from "react-router-dom/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import CreatePost from "../post/CreatePost";
import Notifications from "./Notifications";

// MUI imports
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

// icons
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        {authenticated ? (
          <>
            <Toolbar className="nav-container">
              <CreatePost />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Notifications />
            </Toolbar>
          </>
        ) : (
          <>
            <Toolbar className="nav-container">
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Link to="/login">
                <Button color="inherit"><span className="navLogin">Login</span></Button>
              </Link>
              <Link to="/signup">
                <Button color="inherit"><span className="navSignup">Signup</span></Button>
              </Link>
            </Toolbar>
          </>
        )}
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
