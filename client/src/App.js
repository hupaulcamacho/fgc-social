import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

// Components
import Navbar from './components/Navbar';

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
})

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className='App'>
          <Router>
            <Navbar />
            <div className="container">
              <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/signup' element={<Signup/>} />
              </Routes>
            </div>
          </Router>
        </div>
      </ThemeProvider>
    )
  }
}
export default App;
