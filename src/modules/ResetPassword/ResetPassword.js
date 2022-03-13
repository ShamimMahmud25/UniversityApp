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
import { getSignupReducer } from "../SignUp/reducer";
import { validate } from "../../components/validation";
import axios from "axios";
import "./resetpassword.css";
class ResetPasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      newPassword: "",
      confirmPassword: "",
      loading: false,
      errors: {
        password: null,
        newPassword: null,
        confirmPassword: null,
      },
      errorMessage: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
      email: this.props.signupData.emailAddress,
    };
  }
  componentDidMount() {
    if (!this.state.email) {
      return this.props.history.push("/signup");
    }
  }
  componentDidUpdate() {
    //console.log(this.state);
  }
  handlePassword = (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        password: event.target.value,
        errorMessage: { ...prev.errorMessage, password: "" },
      };
    });
  };
  handleNewPassword = (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        newPassword: event.target.value,
        errorMessage: { ...prev.errorMessage, newPassword: "" },
      };
    });
  };
  handleConfirmPassword = (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        confirmPassword: event.target.value,
        errorMessage: { ...prev.errorMessage, confirmPassword: "" },
      };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((prev) => {
        return { ...prev, loading: true };
      });
      const body={
          email:this.state.email,
          password:this.state.password,
          newPassword:this.state.newPassword
      }
      axios.post("http://localhost:2021/resetPassword", body).then((response) => {
        this.setState((prev) => {
            return { ...prev, loading: false };
          });
          this.props.history.push("/login");
    
  }
  ).catch((error) => {
      this.setState((prev) => {
        return {
            ...prev,
            errors: {
              ...prev.errors,
              password: true,
            },
            loading: false,
            errorMessage: {
              ...prev.errorMessage,
              password: error.response.data.message,
            },
          };
        });
  });
  };
  hasNoError = () => {
    return (
      this.state.errors.password === false &&
      this.state.errors.newPassword === false &&
      this.state.errors.confirmPassword === false
    );
  };
  validationCheck = (field, value) => {
    const validatedResult = validate("Password", value);
    if (field === "NewPassword") {
      if (value === this.state.password) {
        this.setState((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              newPassword: true,
            },
            loading: false,
            errorMessage: {
              ...prev.errorMessage,
              newPassword: "New Password can not be same as old password",
            },
          };
        });
      } else {
        this.setState((prev) => {
          return {
            ...prev,
            errors: {
              ...prev.errors,
              newPassword: !validatedResult.isValid,
            },
            loading: false,
            errorMessage: {
              ...prev.errorMessage,
              newPassword: validatedResult.message,
            },
          };
        });
      }
    } else {
      this.setState((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            password: !validatedResult.isValid,
          },
          loading: false,
          errorMessage: {
            ...prev.errorMessage,
            password: validatedResult.message,
          },
        };
      });
    }
  };
  validateConfirmPassword = (confirmPassword, newPassword) => {
    if (confirmPassword !== newPassword) {
      this.setState((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            confirmPassword: true,
          },
          loading: false,
          errorMessage: {
            ...prev.errorMessage,
            confirmPassword: "Password Do not match",
          },
        };
      });
    } else {
      this.setState((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            confirmPassword: false,
          },
          loading: false,
          errorMessage: {
            ...prev.errorMessage,
            confirmPassword: "",
          },
        };
      });
    }
  };

  render() {
    return (
      <Grid container className="ResetPassword ResetPasswordCointainer">
        <Grid container item spacing={1} className="formContainer">
          <Grid item xs={12} sm={12}>
            <Typography className="heading">
              Please Reset Your Password
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className="passwordInput">
            <TextField
              value={this.state.password}
              label="Password"
              variant="outlined"
              fullWidth
              onChange={this.handlePassword}
              onBlur={(event) => {
                this.validationCheck("Password", event.target.value);
              }}
              type="password"
              error={this.state.errors.password}
              helperText={this.state.errorMessage.password}
            />
          </Grid>
          <Grid item xs={12} sm={12} className="passwordInput">
            <TextField
              value={this.state.newPassword}
              label="NewPassword"
              variant="outlined"
              fullWidth
              onChange={this.handleNewPassword}
              onBlur={(event) => {
                this.validationCheck("NewPassword", event.target.value);
              }}
              type="password"
              error={this.state.errors.newPassword}
              helperText={this.state.errorMessage.newPassword}
            />
          </Grid>
          <Grid item xs={12} sm={12} className="confirmInput">
            <TextField
              value={this.state.confirmPassword}
              label="Confirm Password"
              variant="outlined"
              onChange={(event) => {
                this.handleConfirmPassword(event);
                console.log(this.state.confirmPassword);
                this.validateConfirmPassword(
                  event.target.value,
                  this.state.newPassword
                );
              }}
              fullWidth
              type="password"
              error={this.state.errors.confirmPassword}
              helperText={this.state.errorMessage.confirmPassword}
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
              disabled={this.state.loading || !this.hasNoError()}
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
                "Confirm"
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
export const ResetPassword = withRouter(
  connect(mapStateToProps)(ResetPasswordComponent)
);
