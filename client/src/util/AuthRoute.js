import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function AuthRoute({ authenticated }) {
  return authenticated ?  <Navigate to='/' /> : <Outlet />
}

export default AuthRoute