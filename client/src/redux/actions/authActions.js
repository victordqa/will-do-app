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
import { getErrorsAction } from "./errorActions";
import axios from "axios";

//This action keeps sending a token to the server to confirm authentication
// every time App component rerenders
export const loadUser = () => async (dispatch, getState) => {
  // Set user state to loading
  dispatch(loadingUserAction());
  try {
    let res = await axios.get(
      "http://localhost:5000/api/auth/user",
      tokenConfig(getState)
    );
    dispatch(loadingUserSuccsessAction(res.data));
  } catch (e) {
    console.error(e.message);
    dispatch(getErrorsAction(e.response.data, e.response.status));
    dispatch(authErrorAction());
  }
};

export const tokenConfig = (getState) => {
  //Get token from redux, if any
  let token = getState().auth.token;
  let config = {
    headers: { "content-type": "application/json" },
  };

  //if there is a token, add it to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};

export const loadingUserAction = () => {
  return { type: LOADING_USER };
};

export const authErrorAction = () => {
  return { type: AUTH_ERROR };
};

export const loadingUserSuccsessAction = (user) => {
  return {
    type: LOADING_USER_SUCCSESS,
    payload: user,
  };
};

export const registerAction = ({ username, email, password }) => {
  return {
    type: LOADING_USER_SUCCSESS,
  };
};
