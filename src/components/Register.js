import React from "react";
import { useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core";
import {getSignupReducer} from '../modules/SignUp/reducer';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => {
  return {
      pagecontainer:{
        background:'#FFFDE4',
        margin:0
      },
    container: {
      marginTop:50,
      marginLeft: "25%",
      width: "50%",
      border: "1px solid blue",
      background:'#f4f4f4'
    },
    heading: {
      textAlign: "center"
    },
    formContainer: {
      marginLeft: "5%",
      marginTop:10,
      fontSize: "15px",
    },
    input: {
      width: "40%",
      marginTop: 5,
      padding:5
    },
    label:{
       display:'block',
       marginTop: 5,
    },
    btn:{
        marginTop:50,
        marginLeft:'30%',
        background:'#00FFFF',
        minWidth:'150px',
        marginBottom:20
    },
    errormessage:{
        fontSize:20,
        color:'#FF0000'
    }
  };
});

const RegistrationComponent=(props)=> {
  const classes = useStyles();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [address, setAddress] = useState('')
  const [mobile, setMobile] = useState('')
  const [session, setSession] = useState('2000-2001')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [sID, setSID] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
  console.log(props);
  }, [props]);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  const handlefirstName=(e)=>{
      setfirstName(e.target.value)
  }
  const handlelastName=(e)=>{
    setlastName(e.target.value)
}
const handleAdress=(e)=>{
    setAddress(e.target.value)
}
const handleMobile=(e)=>{
    setMobile(e.target.value)
}
const handleSession=(e)=>{
    setSession(e.target.value)
}
const handlePassword=(e)=>{
  
    setPassword(e.target.value)
 
}
const handleSID=(e)=>{
    setSID(e.target.value)
}
const handleConfirmPassword=(e)=>{
    setconfirmPassword(e.target.value)
  
    if((e.target.value!==password && e.target.value.length===password.length ) || e.target.value.length>password.length)
    {
        setErrorMessage('Password Do Not Match');
    }
    else{
        setErrorMessage('');
    }
}

  return (
    <div className={classes.pagecontainer}>
      <div className={classes.container}>
        
        <form onSubmit={handleSubmit} className={classes.formContainer}>
        <div className={classes.heading}>
          <h1>Registraion Form</h1>
        </div>
          <label htmlFor="firstName" className={classes.label}>*First Name </label>
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
          <label htmlFor="lastName" className={classes.label}>*Last Name </label>
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
          <label htmlFor="address" className={classes.label}>*Adress </label>
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
          <label htmlFor="email" className={classes.label}>Email Address </label>
          <input
            type="email"
            value={props.signupData.emailAddress}
            id="email"
            className={classes.input}
            disabled
          />
          <br />
           <label htmlFor="mobile" className={classes.label}>*Mobile Number </label>
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
          <label htmlFor="session" className={classes.label}>*Session </label>
          <select id='session' value={session} onChange={handleSession}>
              <option value='2000-2001'>2000-2001</option>
              <option value='2001-2002'>2001-200</option>
              <option value='2002-2003'>2002-200</option>
              <option value='2003-2004'>2003-2004</option>
              <option value='2004-2005'>2004-2005</option>
              <option value='2005-2006'>2005-2006</option>
              <option value='2007-2008'>2007-2008</option>
              <option value='2009-2010'>2009-2010</option>
              <option value='2010-2011'>2010-2011</option>
              <option value='2011-2012'>2011-201</option>
              <option value='2012-2013'>2012-2013</option>
          </select>
          <label htmlFor="sid" className={classes.label}>Student ID</label>
          <input
            type="text"
            name="sid"
            id="sid"
            value={sID}
            onChange={handleSID}
            placeholder="e.g. 1610xxxxxx"
            className={classes.input}
          />
          <label htmlFor="password" className={classes.label}>*Password</label>
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
           <label htmlFor="confirmpassword" className={classes.label}>*Confirm Password</label>
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
         
          <span className={classes.errormessage}>
              {errorMessage}
          </span>
          <br/>
          <button  className={classes.btn} type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps=state=>{
  return{
  signupData: getSignupReducer(state),
  }
}
export const  Registration=connect(mapStateToProps)(RegistrationComponent)