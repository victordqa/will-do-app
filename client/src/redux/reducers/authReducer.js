import {
  LOADING_USER,
  LOADING_USER_SUCCSESS,
  AUTH_ERROR,
  LOGIN_SUCCSESS,
  LOGIN_FAILURE,
  REGISTER_SUCCSESS,
  REGISTER_FAILURE,
  LOGOUT_SUCCSESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticaded: null,
  isLoading: null,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoading: true,
      };
    case LOADING_USER_SUCCSESS:
      return {
        ...state,
        isAuthenticaded: true,
        isLoading: false,
        user: action.payload,
      };
    case REGISTER_SUCCSESS:
    case LOGIN_SUCCSESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state, //test if cloning the state is necessary
        ...action.payload, // add user and token retrieved from server
        isAuthenticaded: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case LOGOUT_SUCCSESS:
      localStorage.removeItem("token");
      return {
        ...state, //test if cloning the state is necessary
        token: null,
        isAuthenticaded: false,
        isLoading: false,
        user: null,
      };

    default:
      return state;
  }
};
