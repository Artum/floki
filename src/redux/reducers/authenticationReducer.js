import { USER_SIGN_IN, USER_SIGN_OUT, USER_AUTHORIZED, USER_UNAUTHORIZED } from "../actions/actionTypes";

const INITIAL_STATE = {
  isSignedIn: null,
  isAuthorized: null,
  userProfile: null,
  authResponse: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        authProvider: action.payloadauthProvider,
        userProfile: action.payload.userProfile,
        authResponse: action.payload.authResponse,
        accessToken: action.payload.accessToken,
      };

    case USER_SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        authProvider: null,
        userProfile: null,
        authResponse: null,
      };

    case USER_AUTHORIZED:
      return {
        ...state,
        isAuthorized: true,
      };

    case USER_UNAUTHORIZED:
      return {
        ...state,
        isAuthorized: false,
      };

    default:
      return state;
  }
};
