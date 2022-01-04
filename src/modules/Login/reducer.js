import { USER_LOGGEDIN,USER_LOGOUT } from "./action";

const initialState={
    isLogin:false
}

function loginReducer(state = initialState, action) {
switch(action.type){
    case  USER_LOGGEDIN: return{
        isLogin:true
        
    }
    case USER_LOGOUT: return{
        isLogin:false
    }
    default: return state
}
}

export const getLoginReducer = state => state.loginReducer;

export default loginReducer;