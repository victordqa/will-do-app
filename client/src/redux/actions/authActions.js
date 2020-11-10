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
import axios from "axios";

export const loadUser = () => async (dispatch, getState) => {
  // Set user state to loading
  dispatch(loadingUser());

  //Check if token is stored
  let token = getState().token;

  //configure header and token for GET request with axios
  if (token) {
    let config = {};
    config.headers = {
      "content-type": "application/json",
      "x-auth-token": `${token}`,
    };
    config.method = "get";
    config.url = "";
  }
};

export const loadingUser = () => {
  type: LOADING_USER;
};
