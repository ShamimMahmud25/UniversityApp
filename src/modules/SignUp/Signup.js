import  React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {CircularProgress,makeStyles} from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {getSignupReducer} from './reducer';
import { connect } from "react-redux";
//import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updateSignUpEmail } from './action';
import axios from 'axios';
import {userServiceAPI} from "../../config/config";


const theme = createTheme();
const useStyles=makeStyles(()=>{
  return{  
    loading: {
    color: "white",
    position: "absolute"
  }
}
})
const SignupComponent=props=> {
  const classes=useStyles();
  const [email,setEmail]=useState("");
  const [loading,setLoading]=useState(false);
  const history=useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    props.dispatch(updateSignUpEmail(email.trim()));
    const body={email:email.trim()};
    axios.post(`${userServiceAPI}/email/validate`, body).then((response) => {
      setLoading(false);
      history.push("/register")
  }).catch((error) =>{
    setLoading(false);
    history.push("/login"); 

  });
  };
  const handleEmailChange=(event)=>{
    setEmail(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
               {loading ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  className={classes.loading}
                  size={24}
                  thickness={5}
                />
              ) : (
                "Signup"
              )}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
const mapStateToProps=state=>{
  return{
  signupData: getSignupReducer(state),
  }
  
}

export const  Signup=connect(mapStateToProps)(SignupComponent)