import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";


import ThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7c88cc",
      main: "#5c6bc0",
      dark: "#404a86",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9ad29c",
      main: "#81c784",
      dark: "#5a8b5c",
      contrastText: "#fff",
    },
    delete: { main: "#e63535" },
  },
});

axios.defaults.baseURL = "https://us-central1-fgc-social.cloudfunctions.net/api";


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<AuthRoute />}>
                <Route exact path="/login" element={<Login />} />
              </Route>
              <Route exact path="/signup" element={<AuthRoute />}>
                <Route path="/signup" element={<Signup />} />
              </Route>
              <Route exact path="/users/:handle" element={<User />} />
              <Route
                exact
                path="/users/:handle/post/:postId"
                element={<User />}
              />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
