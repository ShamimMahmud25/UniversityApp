import React, { Component } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { getSignupReducer } from "./reducer";
import { connect } from "react-redux";
import { validate } from "../../components/validation";
import { withRouter } from "react-router-dom";
import { updateSignUpEmail } from "./action";
import axios from "axios";
import "./signup.css";
class SignupNewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", loading: false, error: null, errorMessage: "" };
  }
  handleEmail = (event) => {
    this.setState((prev) => {
      return { ...prev, email: event.target.value,error:false,errorMessage:"" };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const validatedResult = validate("Email", this.state.email);
    if (validatedResult.isValid) {
      this.setState((prev) => {
        return { ...prev, loading: true };
      });
      this.props.dispatch(updateSignUpEmail(this.state.email.trim()));
      const body = { email: this.state.email.trim() };
      axios
        .post("http://localhost:2021/email/validate", body)
        .then((response) => {
          this.setState((prev) => {
            return { ...prev, loading: false };
          });
          this.props.history.push("/register");
        })
        .catch((error) => {
          this.setState((prev) => {
            return { ...prev, loading: false };
          });
          this.props.history.push("/login");
        });
    } else {
      this.setState((prev) => {
        return {
          ...prev,
          error: !validatedResult.isValid,
          loading: false,
          errorMessage: validatedResult.message,
        };
      });
    }
  };

  render() {
    return (
      <Grid container className="Signup signupContainer">
        <Grid container item spacing={1} className="formContainer">
          <Grid item xs={12} sm={12}>
            <Typography variant="h3" className="heading">
              SignUp
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className="emailInput">
            <TextField
              value={this.state.email}
              label="Email"
              variant="outlined"
              onChange={this.handleEmail}
              fullWidth
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
              className="buttonN"
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
                "Signup"
              )}
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
export const SignupNew = withRouter(
  connect(mapStateToProps)(SignupNewComponent)
);
