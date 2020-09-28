import { USER_SIGN_IN, USER_SIGN_OUT } from "../actions/actionTypes";

const INITIAL_STATE = {
  isSignedIn: null,
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
      };

    case USER_SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        authProvider: null,
        userProfile: null,
        authResponse: null,
      };

    default:
      return state;
  }
};
