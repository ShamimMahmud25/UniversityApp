import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateUserInfo } from "../Registration/action";
import { getSignupReducer } from "../SignUp/reducer";
import {userServiceAPI} from "../../config/config";
import axios from "axios";
import "./login.css";
class LoginNewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      loading: false,
      error: null,
      errorMessage: "",
      email: this.props.signupData.emailAddress,
    };
  }
  componentDidMount() {
    if (!this.state.email) {
      this.props.history.push("/signup");
    }
  }
  handlePassword = (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        password: event.target.value,
        error: false,
        errorMessage: "",
      };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((prev) => {
      return { ...prev, loading: true };
    });
    const body = { email: this.state.email, password: this.state.password };
    axios
      .post(`${userServiceAPI}/login`, body)
      .then((response) => {
        //console.log(response);
        axios
          .get(`${userServiceAPI}/user/${this.state.email }`)
          .then((response) => {
            this.props.dispatch(updateUserInfo(response.data.data));
            this.setState((prev) => {
              return { ...prev, loading: false };
            });
            // console.log(response.data.data.isEmailVarified);
            if (!response.data.data.isEmailVarified) {
              this.props.history.push("/verify/email");
            } else {
              this.props.history.push("/home");
            }
          })
          .catch((error) => {
            this.setState((prev) => {
              return {
                ...prev,
                loading: false,
                errorMessage: error.response.data.message,
                error: true,
              };
            });
          });
      })
      .catch((error) => {
        this.setState((prev) => {
          return {
            ...prev,
            loading: false,
            errorMessage: error.response.data.message,
            error: true,
          };
        });
      });
  };
  handleForgetPassword = (event) => {
    event.preventDefault();
    this.props.history.push("/forgetpassword");
  };

  render() {
    return (
      <Grid container className="Login loginContainer">
        <Grid container item spacing={1} className="formContainer">
          <Grid item xs={12} sm={12}>
            <Typography variant="h3" className="heading">
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className="emailInput">
            <TextField
              value={this.state.email}
              label="Email"
              variant="outlined"
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} className="passwordInput">
            <TextField
              value={this.state.password}
              label="Password"
              variant="outlined"
              onChange={this.handlePassword}
              fullWidth
              type="password"
              error={this.state.error}
              helperText={this.state.errorMessage}
            />
          </Grid>
          <Grid item xs={12} sm={12} className="buttonclass">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="continueButton"
              onClick={this.handleSubmit}
            >
              {this.state.loading ? (
                <CircularProgress
                  variant="indeterminate"
                  disableShrink
                  className="loading"
                  size={24}
                  thickness={5}
                />
              ) : (
                "Continue"
              )}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} className="buttonclass">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="forgetButton"
              onClick={this.handleForgetPassword}
            >
              Forget Password
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
function mapStateToProps(state) {
  return {
    signupData: getSignupReducer(state),
  };
}
export const LoginNew = withRouter(connect(mapStateToProps)(LoginNewComponent));
