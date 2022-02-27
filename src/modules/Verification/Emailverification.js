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
import { getSignupReducer } from '../SignUp/reducer';
import {validate} from "../../components/validation";
// import axios from "axios";
import "./verification.css";
class EmailVerificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { code: "", loading: false, error: null, errorMessage: "",email:this.props.signupData.emailAddress };
  }
  componentDidMount(){
    //   if(!this.state.email){
    //     this.props.history.push("/signup");
    //   }
  }
  handleVeficationCode = (event) => {
    this.setState((prev) => {
      return { ...prev, code: event.target.value,errorMessage:"" };
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
     console.log("Email verified!!");
  };
  hasNoError=()=>{
      return this.state.error===false;
  }
  validationCheck=()=>{
    const validatedResult=validate("Code",this.state.code);
    this.setState((prev) => {
        return {
          ...prev,
          error: !validatedResult.isValid,
          loading: false,
          errorMessage: validatedResult.message,
        };
      });
    
  }

  render() {
    return (
      <Grid container className="Emailverification EmailverificationContainer">
        <Grid container item spacing={1} className="formContainer">
          <Grid item xs={12} sm={12}>
            <Typography variant="p" className="heading">
              6 digits verificationcode has been send to your email.Plese verify your email.
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
          <Grid item xs={12} sm={12} className="codeInput">
            <TextField
              value={this.state.code}
              label="code"
              variant="outlined"
              onChange={this.handleVeficationCode}
              onBlur={this.validationCheck}
              fullWidth
              type="code"
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
                "Verify"
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
export const Emailverification = withRouter(
  connect(mapStateToProps)(EmailVerificationComponent)
);
