import { UPDATEUSER_INFO } from "./action";

const initialState={
    firstName:'',
    lastName:'',
    address:'',
    mobile:'',
    session:'',
    studentID:'',
    email:''

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
        email:action.userData.email
        
    }
    default: return state
}
}

export const getUserReducer = state => state.userReducer;

export default userReducer;