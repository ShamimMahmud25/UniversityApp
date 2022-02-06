import React from "react";
import { useState } from "react";
import { makeStyles, TextField } from "@material-ui/core";
import { getSignupReducer } from "../SignUp/reducer";
import { getUserReducer } from "./reducer";
import { updateUserInfo } from "./action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {Grid,Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    container: {
      background: "#A9A9A9",
      height:"100vh",
      // display:'flex',
      justifyContent:'center'
    },
    formContainer: {
      margin: "0% 20% 0% 20%",
      fontSize: "15px",
      background:'white',
      borderRadius: '10px',
      boxShadow: '0px 0px 8px 5px rgba(0, 0, 0, .4)',
      display:'flex',
      flexDirection:'row'
    },
    errormessage: {
      fontSize: 20,
      color: "#FF0000",
    },
    header : {
        textAlign:'center',
        fontSize:'1.5rem',
        marginTop:'10px',
        maxHeight:'150px'
    }
  };
});

const NewRegistrationComponent = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setfirstName] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [lastName, setlastName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [session, setSession] = useState("2000-2001");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [studentID, setstudentID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState(props.signupData.emailAddress);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Password Do Not Match");
    }
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
    axios.post("http://localhost:2021/signup", Data)
    .then(response => {
          props.dispatch(updateUserInfo(Data));
          console.log(response.status);
          setRegistrationError('');
          history.push("/home");
    })
    .catch(error => {
      setRegistrationError(error.response.data.message);
      console.log(error.response.data);
    });
    
  };
  const handlefirstName = (e) => {
    setfirstName(e.target.value);
    setRegistrationError('');
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setRegistrationError('');
  };
  const handlelastName = (e) => {
    setlastName(e.target.value);
    setRegistrationError('');
  };
  const handleAdress = (e) => {
    setAddress(e.target.value);
    setRegistrationError('');
  };
  const handleMobile = (e) => {
    setMobile(e.target.value);
    setRegistrationError('');
  };
  const handleSession = (e) => {
    setSession(e.target.value);
    setRegistrationError('');
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setRegistrationError('');
  };
  const handlestudentID = (e) => {
    setstudentID(e.target.value);
    setRegistrationError('');
  };
  const handleConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
    setRegistrationError('');

    if (e.target.value !== password) {
      setErrorMessage("Password Do Not Match");
    } else {
      setErrorMessage("");
    }
  };

  return (
   <Grid container  className={classes.container}>
       <Grid item container className={classes.formContainer}>
          <Grid item xs={12}>
          <Typography varient="h3"  className={classes.header}>
              Registraion Form
          </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
         <TextField label="FirstName" fullWidth variant="filled">

         </TextField>
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
export const NewRegistration = connect(mapStateToProps)(NewRegistrationComponent);
