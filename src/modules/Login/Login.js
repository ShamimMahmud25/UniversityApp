import React, { useState,useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { connect } from "react-redux";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CircularProgress } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom';
import {userServiceAPI} from "../../config/config";
import axios from "axios";
import { updateUserInfo } from "../Registration/action";
import { getSignupReducer } from '../SignUp/reducer';
const useStyles = makeStyles({
  loginButton: {
    height: '40px',
  },
  errorMessage: {
    color: 'red',
  },
  loading: {
    color: 'white',
    position: 'absolute'
  }
});

const theme = createTheme();

const LoginInComponent = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(props.signupData.emailAddress);
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const body = { email, password };
    axios.post(`${userServiceAPI}/login`, body).then((response) => {
      axios.get(`${userServiceAPI}/user/${email}`).then((response) => {
        props.dispatch(updateUserInfo(response.data.data));
      }).catch((error) => {
        setLoginError(error.response.data.message);
        setLoading(false);
      });

      setLoading(false);
      history.push("/home")
    }
    ).catch((error) => {
      setLoginError(error.response.data.message);
      setLoading(false);
    });

  };
  const handleForgetPassword = (event) => {
    event.preventDefault();
    setLoginError('');
    history.push("/forget-password");

  };
  // const handleEmail = (event) => {
  //   setLoginError('');
  //   setEmail(event.target.value);
  // }
  const handlePassword = (event) => {
    setLoginError('');
    setPassword(event.target.value);
  }
  useEffect(()=>{
    if(!props.signupData.emailAddress){
      history.push("/");
    }
  })

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
            Log In
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              disabled
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            {loginError &&
              <Typography varient="p" className={classes.errorMessage}>
                {loginError}
              </Typography>}
            <Button
              type="submit"
              fullWidth
              className={classes.loginButton}
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
                "Login"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  <span onClick={handleForgetPassword}>
                    Forgot password?
                  </span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    signupData: getSignupReducer(state),
  };
};
export const Login = connect(mapStateToProps)(LoginInComponent);