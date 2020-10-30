import { USER_SIGN_IN, USER_SIGN_OUT, USER_AUTHORIZED, USER_UNAUTHORIZED } from "./actionTypes";

import { authorizeUser, loginUser } from "../../api/backend";

export const authorize = (authCode) => {
  if (authCode === null) {
    return {
      type: USER_AUTHORIZED,
    };
  }

  return async (dispatch) => {
    try {
      const response = await authorizeUser(authCode);
      console.log(`authorize action: response=${response.data}`);
      dispatch({
        type: USER_AUTHORIZED,
      });
    } catch (error) {
      console.log(`authorize action: error=${error}`);
      dispatch(signOut);
    }
  };
};

export const unauthorize = () => {
  return {
    type: USER_UNAUTHORIZED,
  };
};

export const signIn = (authProvider, userProfile, authResponse) => {
  return async (dispatch) => {
    try {
      const response = await loginUser(
        userProfile.userId,
        authResponse.id_token,
        userProfile.fullName,
        userProfile.firstName,
        userProfile.lastName,
        userProfile.email
      );
      console.log("signIn action: response=" + response.data);
      dispatch({
        type: USER_SIGN_IN,
        payload: {
          authProvider,
          userProfile,
          authResponse,
          accessToken: response.data.access_token,
        },
      });
    } catch (error) {
      console.log(`signIn action: error=${error}`);
      dispatch(signOut);
    }
  };
};

export const signOut = () => {
  return {
    type: USER_SIGN_OUT,
  };
};
