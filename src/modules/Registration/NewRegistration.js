import React from "react";
import { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { getSignupReducer } from "../SignUp/reducer";
import { getUserReducer } from "./reducer";
import { updateUserInfo } from "./action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {userServiceAPI} from "../../config/config";
import { Grid, Typography, Button, CircularProgress, MenuItem} from "@material-ui/core";
import { validate } from "../../components/validation";

const sessions = [
  {
    value: "2000-2001",
  },
  {
    value: "2001-2002",
  },
  {
    value: "2002-2003",
  },
  {
    value: "2003-2004",
  },
  {
    value: "2004-2005",
  },
  {
    value: "2005-2006",
  },
  {
    value: "2007-2008",
  },
  {
    value: "2008-2009",
  },
  {
    value: "2009-2010",
  },
  {
    value: "2010-2011",
  },
  {
    value: "2011-2012",
  },
  {
    value: "2012-2013",
  },
  {
    value: "2013-2014",
  },
  {
    value: "2014-2015",
  },
  {
    value: "2015-2016",
  },
  {
    value: "2016-2017",
  },
  {
    value: "2017-2018",
  },
];

const useStyles = makeStyles((theme) => {
  return {
    container: {
      background: "#A9A9A9",
      // display:'flex',
      justifyContent: "center",
    },
    formContainer: {
      margin: "0% 20% 0% 20%",
      fontSize: "15px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0px 0px 8px 5px rgba(0, 0, 0, .4)",
      display: "flex",
      flexDirection: "row",
    },
    errormessage: {
      fontSize: 20,
      color: "#FF0000",
    },
    header: {
      textAlign: "center",
      fontSize: "1.5rem",
      marginTop: "10px",
      maxHeight: "150px",
    },
    Info: {
      margin: "0% 25% 0% 20%",
    },
    loading: {
      color: "white",
      position: "absolute",
    },
    continueButton :{
      background:'green'
    }
  };
});

const NewRegistrationComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setfirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [session, setSession] = useState("2000-2001");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [studentID, setstudentID] = useState("");
  const [email, setEmail] = useState(props.signupData.emailAddress);
  const [error,setError]=useState({
    firstName:null,
    lastName:null,
    address:null,
    mobile:null,
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
    };
    axios
      .post(`${userServiceAPI}/signup`, Data)
      .then((response) => {
        props.dispatch(updateUserInfo(Data));
        console.log(response.status);
        setRegistrationError("");
        setLoading(false);
        history.push("/verify/email");
      })
      .catch((error) => {
        setLoading(false);
        setRegistrationError(error.response.data.message);
        console.log(error.response.data);
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

  return (
    <Grid container className={classes.container}>
      <Grid item container className={classes.formContainer}>
        <Grid item xs={12}>
          <Typography varient="h3" className={classes.header}>
            Registraion Form
          </Typography>
        </Grid>
        <Grid item container className={classes.Info} spacing={2}>
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
          <Grid item xs={12}>
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
          </Grid>
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
              className={classes.continueButton}
              onClick={handleSubmit}
              disabled={loading ||!hasNoError()}
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
                "Continue"
              )}
            </Button>
            <div className={classes.errormessage}>
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
