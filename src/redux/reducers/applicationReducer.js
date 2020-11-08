import { APPLICATION_READY } from "../actions/actionTypes";

const INITIAL_STATE = {
  isReady: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPLICATION_READY:
      return {
        ...state,
        isReady: true,
      };

    default:
      return state;
  }
};
