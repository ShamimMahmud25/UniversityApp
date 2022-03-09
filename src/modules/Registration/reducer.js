import { UPDATEUSER_INFO,USER_EMAIL_VERIFIED } from "./action";

const initialState={
    firstName:'',
    lastName:'',
    address:'',
    mobile:'',
    session:'',
    studentID:'',
    email:'',
    isEmailVerifed:false

}

function userReducer(state = initialState, action) {
switch(action.type){
    case UPDATEUSER_INFO: return{
        ...state,
        firstName:action.userData.firstName,
        lastName:action.userData.lastName,
        address:action.userData.address,
        mobile:action.userData.mobile,
        session:action.userData.session,
        studentID:action.userData.studentID,
        email:action.userData.email,
        isEmailVerifed:action.userData.isEmailVerifed
        
    }
    case USER_EMAIL_VERIFIED: return {
        ...state,
        isEmailVerifed:true
    }
    default: return state
}
}

export const getUserReducer = state => state.userReducer;

export default userReducer;