import { USER_SIGN_IN, USER_SIGN_OUT } from "./actionTypes";

export const signIn = (authProvider, userProfile, authResponse) => {
  console.log(userProfile);
  console.log(authResponse);
  return {
    type: USER_SIGN_IN,
    payload: {
      authProvider,
      userProfile,
      authResponse,
    },
  };
};

export const signOut = () => {
  return {
    type: USER_SIGN_OUT,
  };
};
