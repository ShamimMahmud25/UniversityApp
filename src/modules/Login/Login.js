import React, { useState } from 'react';
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
import { createTheme, ThemeProvider} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'
import { useHistory } from 'react-router-dom';
import axios from "axios";
 import { updateUserInfo } from "../Registration/action";
 import { getUserReducer } from "../Registration/reducer"
const useStyles=makeStyles({
  loginButton : {
    height: '40px',
  },
  errorMessage:{
    color:'red',
  }
});

const theme = createTheme();

const  LoginInComponent=(props)=> {
  const classes=useStyles();
  const [email, setEmail] = useState("");
  const [loginError, setLoginError] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleSubmit = (event) => {
    event.preventDefault();
    const body = { email, password };
    console.log(body);
    axios.post("http://localhost:2021/login", body).then((response) => {
      console.log(response);
      props.dispatch(updateUserInfo(response.data.Data));
      history.push("/home")
  }
    ).catch((error) => setLoginError('Email/password do not match'));

  };
  const handleSignup = (event) => {
    event.preventDefault();
    setLoginError('');
    history.push("/signup");

  };
  const handleForgetPassword = (event) => {
    event.preventDefault();
    setLoginError('');
    history.push("/forget-password");

  };
  const handleEmail = (event) => {
    setLoginError('');
    setEmail(event.target.value);
  }
  const handlePassword = (event) => {
    setLoginError('');
    setPassword(event.target.value);
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
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmail}
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
              <Typography varient="p"className={classes.errorMessage}>
                {loginError}
              </Typography>}
            <Button
              type="submit"
              fullWidth
              className={classes.loginButton}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  <span onClick={handleForgetPassword}>
                    Forgot password?
                  </span>
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  <span onClick={handleSignup}>
                    {"Don't have an account? Sign Up"}
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
    userData: getUserReducer(state),
  };
};
export const Login = connect(mapStateToProps)(LoginInComponent);