import React from "react";
import {getUserReducer} from './reducer';
import { connect } from "react-redux";

const TestComponent=(props)=> {
 
  return (
    <div >
      <p>Firstname :{props.userData.fname} </p>
      <p>Lastname :{props.userData.lname} </p>
      <p>Email :{props.userData.email} </p>
      <p>Address :{props.userData.address} </p>  
      <p>Mobile :{props.userData.mobile} </p>
      <p>Session :{props.userData.session} </p>
        
    </div>
  );
}
const mapStateToProps=state=>{
  return{
  userData:getUserReducer(state)
  }
}
export const  Test=connect(mapStateToProps)(TestComponent)
