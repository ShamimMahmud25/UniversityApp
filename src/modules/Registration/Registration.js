import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { getSignupReducer } from "../SignUp/reducer";
import { getUserReducer } from "./reducer";
import { updateUserInfo } from "./action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {userServiceAPI} from "../../config/config";

const useStyles = makeStyles((theme) => {
  return {
    pagecontainer: {
      background: "#FFFDE4",
      margin: 0,
    },
    container: {
      marginTop: 50,
      marginLeft: "25%",
      width: "50%",
      background: "#f4f4f4",
    },
    heading: {
      textAlign: "center",
    },
    formContainer: {
      marginLeft: "5%",
      marginTop: 10,
      fontSize: "15px",
    },
    input: {
      width: "40%",
      marginTop: 5,
      padding: 5,
    },
    label: {
      display: "block",
      marginTop: 5,
    },
    btn: {
      marginTop: 50,
      marginLeft: "30%",
      background: "#00FFFF",
      minWidth: "150px",
      marginBottom: 20,
    },
    errormessage: {
      fontSize: 20,
      color: "#FF0000",
    },
  };
});

const RegistrationComponent = (props) => {
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
      email:email.trim(),
    };
    axios.post(`${userServiceAPI}/signup`, Data)
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
    <div className={classes.pagecontainer}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit} className={classes.formContainer}>
          <div className={classes.heading}>
            <h1>Registraion Form</h1>
          </div>
          <label htmlFor="firstName" className={classes.label}>
            *First Name{" "}
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="e.g. Shamim"
            className={classes.input}
            value={firstName}
            onChange={handlefirstName}
            required
          />
          <br />
          <label htmlFor="lastName" className={classes.label}>
            *Last Name{" "}
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={handlelastName}
            placeholder="e.g. Mahmud"
            className={classes.input}
            required
          />
          <br />
          <label htmlFor="address" className={classes.label}>
            *Adress{" "}
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={handleAdress}
            placeholder="e.g. village,p.o.,thana,district"
            className={classes.input}
            required
          />
          <label htmlFor="email" className={classes.label}>
            *Email Address{" "}
          </label>
          <input
            type="email"
            value={email}
            id="email"
            className={classes.input}
            onChange={handleEmail}
          />
          <br />
          <label htmlFor="mobile" className={classes.label}>
            *Mobile Number{" "}
          </label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            placeholder="e.g. 01xxxxxxxxx"
            value={mobile}
            onChange={handleMobile}
            className={classes.input}
            required
          />
          <br />
          <label htmlFor="session" className={classes.label}>
            *Session{" "}
          </label>
          <select id="session" value={session} onChange={handleSession}>
            <option value="2000-2001">2000-2001</option>
            <option value="2001-2002">2001-2002</option>
            <option value="2002-2003">2002-2003</option>
            <option value="2003-2004">2003-2004</option>
            <option value="2004-2005">2004-2005</option>
            <option value="2005-2006">2005-2006</option>
            <option value="2007-2008">2007-2008</option>
            <option value="2009-2010">2009-2010</option>
            <option value="2010-2011">2010-2011</option>
            <option value="2011-2012">2011-2012</option>
            <option value="2012-2013">2012-2013</option>
            <option value="2013-2014">2013-2014</option>
            <option value="2014-2015">2014-2015</option>
            <option value="2015-2016">2015-2016</option>
            <option value="2016-2017">2016-2017</option>
            <option value="2017-2018">2017-2018</option>
            <option value="2018-2019">2018-2019</option>
            <option value="2019-2020">2019-2020</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2023-2024">2023-2024</option>
          </select>
          <label htmlFor="studentID" className={classes.label}>
            Student ID
          </label>
          <input
            type="text"
            name="studentID"
            id="studentID"
            value={studentID}
            onChange={handlestudentID}
            placeholder="e.g. 1610xxxxxx"
            className={classes.input}
          />
          <label htmlFor="password" className={classes.label}>
            *Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            placeholder="Atleast 8 charecter"
            className={classes.input}
            required
          />
          <label htmlFor="confirmpassword" className={classes.label}>
            *Confirm Password
          </label>
          <input
            type="password"
            name="onfirmpassword"
            id="onfirmpassword"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            placeholder="Re-type Password"
            className={classes.input}
            required
          />

          <span className={classes.errormessage}>{errorMessage}</span>
          <br />
          {registrationError &&
          <div className={classes.errormessage}>
            {registrationError}
          </div>
          }
          <button className={classes.btn} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    signupData: getSignupReducer(state),
    userData: getUserReducer(state),
  };
};
export const Registration = connect(mapStateToProps)(RegistrationComponent);
