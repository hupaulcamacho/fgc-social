import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AuthRoute = ({ authenticated }) => {
  return authenticated ?  <Navigate to='/' /> : <Outlet />
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

AuthRoute.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(AuthRoute);