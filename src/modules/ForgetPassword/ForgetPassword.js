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
import {userServiceAPI,mailSendAPI} from "../../config/config";
import "./forgetpassword.css";
class ForgetPasswordComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      code:"",
      confirmPassword: "",
      loading: false,
      errors: {
        password: null,
        code:null,
        confirmPassword: null,
      },
      errorMessage: {
        password: "",
        code:"",
        confirmPassword: "",
      },
      email: this.props.signupData.emailAddress,
    //   email:"mahmudshamim366@grr.la",
      isEmailVerified: false,
    };
  }
  componentDidMount() {
      if(!this.state.email){
        return this.props.history.push("/signup");
      }
      else{
        axios
        .post(`${mailSendAPI}/sendOTP`, {email:this.state.email})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          this.setState((prev) => {
            return {
                ...prev,
                loading: false,
                errors: {
                  ...prev.errors,
                  code: true,
                },
                errorMessage: {
                  ...prev.errorMessage,
                  code: error.response.data.message,
                },
              };
          });
        });
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
  handleCode = (event) => {
    this.setState((prev) => {
      return {
        ...prev,
        code: event.target.value,
        errorMessage: { ...prev.errorMessage, code: "" },
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
  handleCodeSubmit = (event) => {
    event.preventDefault();
    this.setState((prev) => {
      return { ...prev, loading: true };
    });
  const body = {email:this.state.email,otp:this.state.code };
  axios.post(`${mailSendAPI}/verifyEmail`, body).then((response) => {
      this.setState((prev) => {
        return { ...prev, loading: false,isEmailVerified:true };
      });
  }
  ).catch((error) => {
      this.setState((prev) => {
        return {
          ...prev,
          loading: false,
          errors: {
            ...prev.errors,
            code: true,
          },
          errorMessage: {
            ...prev.errorMessage,
            code: error.response.data.message,
          },
        };
      });
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
      }
          axios.post(`${userServiceAPI}/forgetPassword`, body).then((response) => {
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
  validationCheck = (field, value) => {
    const validatedResult = validate(field, value);
    if(field==="Password"){
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
    else {
        this.setState((prev) => {
            return {
              ...prev,
              errors: {
                ...prev.errors,
                code: !validatedResult.isValid,
              },
              loading: false,
              errorMessage: {
                ...prev.errorMessage,
                code: validatedResult.message,
              },
            };
          });
    }
  
  };
  validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password) {
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
  hasNoError = () => {
    return (
      this.state.errors.password === false &&
      this.state.errors.confirmPassword === false
    );
  };
  hasNoCodeError=() =>{
      return this.state.errors.code===false
  }

  render() {
    return (
      <Grid container className="ForgetPassword">
        <Grid container item spacing={1} className="formContainer">
          <Grid item xs={12} sm={12}>
            <Typography className="heading">
              {this.state.isEmailVerified
                ? "Please Reset Your Password"
                : "6 digits verificationcode has been send to your email.Plese verify your email."}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} className="passwordInput">
            {this.state.isEmailVerified && (
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
            )}
            {!this.state.isEmailVerified && (
              <TextField
                value={this.state.email}
                label="Email"
                variant="outlined"
                fullWidth
                disabled
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} className="confirmInput">
            {this.state.isEmailVerified && (
              <TextField
                value={this.state.confirmPassword}
                label="Confirm Password"
                variant="outlined"
                onChange={(event) => {
                  this.handleConfirmPassword(event);
                  console.log(this.state.confirmPassword);
                  this.validateConfirmPassword(
                    event.target.value,
                    this.state.password
                  );
                }}
                fullWidth
                type="password"
                error={this.state.errors.confirmPassword}
                helperText={this.state.errorMessage.confirmPassword}
              />
            )}
            {!this.state.isEmailVerified && (
              <TextField
                value={this.state.code}
                label="code"
                variant="outlined"
                onChange={this.handleCode}
                onBlur={(event)=>{
                    this.validationCheck("Code",event.target.value)}}
                fullWidth
                type="code"
                error={this.state.errors.code}
                helperText={this.state.errorMessage.code}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} className="buttonclass">
            {this.state.isEmailVerified && (
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
            )}
            {!this.state.isEmailVerified && (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="continueButton"
                onClick={this.handleCodeSubmit}
                disabled={this.state.loading || !this.hasNoCodeError()}
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
                  "Verify"
                )}
              </Button>
            )}
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
export const ForgetPassword = withRouter(
  connect(mapStateToProps)(ForgetPasswordComponent)
);
