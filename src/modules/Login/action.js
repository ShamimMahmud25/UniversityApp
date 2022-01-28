export const USER_LOGGEDIN='USER_LOGGEDIN';
export const USER_LOGOUT='USER_LOGOUT';
export const userLogin = () => ({
    type:USER_LOGGEDIN
  });

  export const userLogout = () => ({
    type:USER_LOGOUT
  });