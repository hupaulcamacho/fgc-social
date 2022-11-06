import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

// Components
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute'

// Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

const theme = createTheme({
  palette: {
    primary: {
      light: '#7c88cc',
      main: '#5c6bc0',
      dark: '#404a86',
      contrastText: '#fff'
    },
    secondary: {
      light: '#9ad29c',
      main: '#81c784',
      dark: '#5a8b5c',
      contrastText: '#fff'
    },
  },
});

let authenticated;
const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken)
  if(decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/login' element={<AuthRoute authenticated={authenticated} />}>
                <Route path='/login' element={<Login/>} />
              </Route> 
              <Route path='/signup' element={<AuthRoute authenticated={authenticated} />}>
                <Route path='/signup' element={<Signup/>} />
              </Route> 
            </Routes>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App;
