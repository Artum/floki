import { APPLICATION_READY, USER_SIGN_IN, USER_SIGN_OUT, USER_AUTHORIZED, USER_UNAUTHORIZED } from "./actionTypes";

import { authorizeUser, loginUser } from "../../api/backend";

async function initGoogleLibrary() {
  return new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "email profile openid",
        })
        .then(
          () => resolve(),
          (error) => reject(error)
        );
    });
  });
}

export const initializeApplication = (onAuthChange) => {
  return async (dispatch, getState) => {
    await new Promise(r => setTimeout(r, 2000));
    const isReady = getState().application.isReady;
    if (isReady) {
      return;
    }
    await initGoogleLibrary();

    const auth = window.gapi.auth2.getAuthInstance();

    auth.isSignedIn.listen(onAuthChange);
    const isSignedIn = auth.isSignedIn.get();
    onAuthChange(isSignedIn);
    dispatch({
      type: APPLICATION_READY,
    });
  };
};

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

export const signIn = () => {
  return async (dispatch) => {
    try {
      const auth = window.gapi.auth2.getAuthInstance();
      const profile = auth.currentUser.get().getBasicProfile();
      const authProvider = "google";
      const userProfile = {
        userId: profile.getId(),
        email: profile.getEmail(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        fullName: profile.getName(),
        imageUrl: profile.getImageUrl(),
      };
      const authResponse = auth.currentUser.get().getAuthResponse();

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
