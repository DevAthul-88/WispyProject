import {
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS,
  SET_REGISTER_ERROR,
  SET_ADMIN_LOGIN_REQUEST,
  SET_ADMIN_LOGIN_SUCCESS,
  SET_ADMIN_LOGIN_ERROR,
} from "./type";
import axios from "axios";

export const registerAction = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: SET_REGISTER_REQUEST });
    const { data } = await axios.post("/api/auth/signup", credentials);
    if (data.error)
      return dispatch({ type: SET_REGISTER_ERROR, payload: data.error });
    dispatch({ type: SET_REGISTER_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: SET_REGISTER_ERROR, payload: error.message });
  }
};

export const adminLoginAction = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: SET_ADMIN_LOGIN_REQUEST });
    const { data } = await axios.post("/api/auth/login/admin", credentials);
    if (data.error)
      return dispatch({ type: SET_ADMIN_LOGIN_ERROR, payload: data.error });
    dispatch({ type: SET_ADMIN_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_ADMIN_LOGIN_ERROR, payload: error.message });
  }
};
