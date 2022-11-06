import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/punch.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    width: '100px'
  },
  pageTitle: {
    margin: '10px auto 10px auto !important',
    fontSize: '48px !important'
  },
  textField: {
    margin: '10px auto 10px auto !important',
  },
  button: {
    marginTop: '10px !important',
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: '10px'
  },
  progress: {
    position: 'absolute'
  },
  login: {
    color: 'blue'
  }
}

function Signup(props) {
  const navigate = useNavigate()
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ handle, setHandle ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ errors, setErrors ] = useState({});

  const handleSubmit = (event) => {
    
    event.preventDefault();
    setLoading(true)

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    }

    axios.post('/signup', newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        setLoading(false);
        navigate('/')
      })
      .catch((err) => {
        setErrors(err.response.data);
        setLoading(false);
      })
  }

  const { classes } = props;
  // const { errors, loading } = this.state;
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="punch" className={classes.image}/>
        <Typography variant="h1" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField 
            id="email" 
            name="email" 
            type="email" 
            label="Email" 
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            fullWidth
          />
          <TextField 
            id="password" 
            name="password" 
            type="password" 
            label="Password" 
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}  
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            fullWidth
          />
          <TextField 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            label="Confirm Password" 
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}  
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            fullWidth
          />
          <TextField 
            id="handle" 
            name="handle" 
            type="text" 
            label="Handle" 
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}  
            value={handle} 
            onChange={(e) => setHandle(e.target.value)} 
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>Already have an account? Login <Link to='/login' className={classes.login}>here</Link></small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  )
}


Signup.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Signup);