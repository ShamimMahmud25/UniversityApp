import React from "react";
import { useState } from "react";
import {  TextField } from "@material-ui/core";
import { getSignupReducer } from "../SignUp/reducer";
import { getUserReducer } from "./reducer";
import { updateUserInfo } from "./action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {userServiceAPI} from "../../config/config";
import { Grid, Typography, Button, CircularProgress, MenuItem} from "@material-ui/core";
import { validate } from "../../components/validation";
import {sessions,userTypes} from "../../config/config";
import "./registration.css"

const NewRegistrationComponent = (props) => {
  const history = useHistory();
  const [userType, setUserType] = useState("Student");
  const [designation, setDesignation] = useState("");
  const [firstName, setfirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [session, setSession] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [studentID, setstudentID] = useState("");
  const [email, setEmail] = useState(props.signupData.emailAddress);
  const [error,setError]=useState({
    firstName:null,
    lastName:false,
    address:null,
    mobile:false,
    session:false,
    password:null,
    studentID:false,
    email:false,
    confirmPassword:null
  })
  const [errorMessage,setErrorMessage]=useState({
    firstName:"",
    lastName:"",
    address:"",
    mobile:"",
    session:"",
    password:"",
    studentID:"",
    email:"",
    confirmPassword:""
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const Data = {
      firstName,
      lastName,
      address,
      mobile,
      session,
      password,
      studentID,
      email,
      userType
    };
    if(userType==="Teacher"){
      Data.designation=designation;
    }
    axios
      .post(`${userServiceAPI}/signup`, Data)
      .then((response) => {
        props.dispatch(updateUserInfo(Data));
        setRegistrationError("");
        setLoading(false);
        history.push("/verify/email");
      })
      .catch((error) => {
        setLoading(false);
        setRegistrationError(error.response.data.message);
      });
  };
  const handlefirstName = (e) => {
    setfirstName(e.target.value);
    setRegistrationError("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setRegistrationError("");
  };
  const handlelastName = (e) => {
    setlastName(e.target.value);
    setRegistrationError("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setRegistrationError("");
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setRegistrationError("");
  };
  const handleSession = (e) => {
    setSession(e.target.value);
    setRegistrationError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setRegistrationError("");
  };
  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };
  const handlestudentID = (e) => {
    setstudentID(e.target.value);
    setRegistrationError("");
  };
  const validationCheck=(field,value,Name)=>{
    const validatedResult=validate(Name,value);
    setError((prevState)=>({
          ...prevState,
           [field]:!validatedResult.isValid
        }));
        setErrorMessage((prevState)=>({
        ...prevState,
        [field]:validatedResult.message
      }))
    
  }
  const validateConfirmPassword=(field,value,checkwith)=>{
    if(value!==checkwith){
      setError((prevState)=>({
        ...prevState,
         [field]:true
      }));
      setErrorMessage((prevState)=>({
      ...prevState,
      [field]:"Password do not match"
    }))
    }
    else {
      setError((prevState)=>({
        ...prevState,
         [field]:false
      }));
      setErrorMessage((prevState)=>({
      ...prevState,
      [field]:""
    }))
    }
  }
  const hasNoError=()=>{
    return (error.firstName===false && error.lastName===false && error.address===false && error.email===false &&
    error.mobile===false && error.studentID===false && error.password===false && error.confirmPassword===false); 
  }
   const handleUserType= (e) => {
    setUserType(e.target.value);
  };

  return (
    <Grid container className="registration-container">
      <Grid item container className="formContainer">
        <Grid item xs={12}>
          <Typography varient="h3" className="header">
            Registraion Form
          </Typography>
        </Grid>
        <Grid item container className="Info" spacing={2}>
        <Grid item xs={12}>
            <TextField
              label="UserType"
              select
              value={userType}
              onChange={handleUserType}
              size="small"
              fullWidth
              variant="outlined"
              disabled={loading}
            >
                 {userTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="FirstName"
              value={firstName}
              autoComplete="off"
              onChange={handlefirstName}
               onBlur={()=>validationCheck("firstName",firstName,"FirstName")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.firstName}
              helperText={errorMessage.firstName}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="LastName"
              value={lastName}
              autoComplete="off"
              onChange={handlelastName}
              onBlur={()=>validationCheck("lastName",lastName,"LastName")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.lastName}
              helperText={errorMessage.lastName}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Adress"
              value={address}
              onChange={handleAddress}
              onBlur={()=>validationCheck("address",address,"Address")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.address}
              helperText={errorMessage.address}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              value={email}
              onChange={handleEmail}
              onBlur={()=>validationCheck("email",email,"Email")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.email}
              helperText={errorMessage.email}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              value={mobile}
              onChange={handleMobile}
              onBlur={()=>validationCheck("mobile",mobile,"Mobile")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.mobile}
              helperText={errorMessage.mobile}
              disabled={loading}
            ></TextField>
          </Grid>
         {userType==="Student" ? (<><Grid item xs={12}>
            <TextField
              label="Session"
              select
              value={session}
              onChange={handleSession}
              size="small"
              fullWidth
              variant="outlined"
              disabled={loading}
            >
                 {sessions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Studen ID"
              value={studentID}
              onChange={handlestudentID}
              onBlur={()=>validationCheck("studentID",studentID,"StudentID")}
              size="small"
              fullWidth
              variant="outlined"
              error={error.studentID}
              helperText={errorMessage.studentID}
              disabled={loading}
            ></TextField>
          </Grid></>) : (<Grid item xs={12}>
            <TextField
              label="Designation"
              value={designation}
              autoComplete="off"
              onChange={handleDesignation}
              size="small"
              fullWidth
              variant="outlined"
              disabled={loading}
            ></TextField>
          </Grid>)}
          <Grid item xs={12}>
            <TextField
              label="Password"
              value={password}
              onChange={handlePassword}
              onBlur={()=>validationCheck("password",password,"Password")}
              size="small"
              fullWidth
              type="password"
              variant="outlined"
              error={error.password}
              helperText={errorMessage.password}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              value={confirmPassword}
              type="password"
              onChange={(event)=>{
                setconfirmPassword(event.target.value);
                validateConfirmPassword("confirmPassword",event.target.value,password);
              }}
              size="small"
              fullWidth
              variant="outlined"
              error={error.confirmPassword}
              helperText={errorMessage.confirmPassword}
              disabled={loading}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="continueButton"
              onClick={handleSubmit}
              disabled={loading ||!hasNoError()}
            >
              {loading ? (
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
            <div className="errormessage">
            {registrationError}
          </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => {
  return {
    signupData: getSignupReducer(state),
    userData: getUserReducer(state),
  };
};
export const NewRegistration = connect(mapStateToProps)(
  NewRegistrationComponent
);
