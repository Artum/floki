import { USER_SIGN_IN, USER_SIGN_OUT, USER_AUTHORIZED } from "./actionTypes";

import { authorizeUser } from "../../api/backend";

export const authorize = (authCode) => {
  return async (dispatch) => {
    try {
      const response = await authorizeUser(authCode);
      console.log(`authorize action: response=${response}`);
      dispatch({
        type: USER_AUTHORIZED,
      });
    } catch (error) {
      console.log(`authorize action: error=${error}`);
      dispatch(signOut);
    }
  };
};

export const signIn = (authProvider, userProfile, authResponse) => {
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
