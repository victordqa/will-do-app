import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

let initialState = {
  msg: {},
  status: null,
  id: null,
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        msg: action.payload.message,
        status: action.payload.status,
        id: action.payload.id,
      };
    case CLEAR_ERRORS:
      return initialState;

    default:
      return state;
  }
};
