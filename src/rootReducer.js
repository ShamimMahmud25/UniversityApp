import signupReducer from './modules/SignUp/reducer'
import userReducer from './modules/Registration/reducer';
import { combineReducers } from "redux";

const appReducer=combineReducers({
    signupReducer,
    userReducer
})


const rootReducer = (state, action) => {
    return appReducer(state, action);
  };

  export default rootReducer;