import { UPDATEUSER_INFO } from "./action";

const initialState={
    fname:'',
    lname:'',
    address:'',
    mobile:'',
    session:'',
    sID:'',
    email:''

}

function userReducer(state = initialState, action) {
switch(action.type){
    case UPDATEUSER_INFO: return{
        ...state,
        fname:action.userData.fname,
        lname:action.userData.lname,
        address:action.userData.address,
        mobile:action.userData.mobile,
        session:action.userData.session,
        sID:action.userData.sID,
        email:action.userData.email
        
    }
    default: return state
}
}

export const getUserReducer = state => state.userReducer;

export default userReducer;