import { UPDATESIGNUP_EMAIL } from "./action";

const initialState={
    emailAddress:''
}

function signupReducer(state = initialState, action) {
switch(action.type){
    case UPDATESIGNUP_EMAIL: return{
        ...state,
        emailAddress:action.emailAddress
        
    }
    default: return state
}
}

export const getSignupReducer = state => state.signupReducer;

export default signupReducer;