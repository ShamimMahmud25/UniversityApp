
export const UPDATEUSER_INFO = 'UPDATEUSER_INFO';
export const USER_EMAIL_VERIFIED = 'USER_EMAIL_VERIFIED';
export const updateUserInfo = userData => ({
  type: UPDATEUSER_INFO,
  userData
});
export const userEmailVerified = () => ({
  type: USER_EMAIL_VERIFIED
});
