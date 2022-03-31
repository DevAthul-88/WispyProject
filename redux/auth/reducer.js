import {
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS,
  SET_REGISTER_ERROR,
  SET_ADMIN_LOGIN_REQUEST,
  SET_ADMIN_LOGIN_SUCCESS,
  SET_ADMIN_LOGIN_ERROR,
  SET_SUB_LOGIN_REQUEST,
  SET_SUB_LOGIN_SUCCESS,
  SET_SUB_LOGIN_ERROR,
} from "./type";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGISTER_REQUEST:
      return { loading: true };
    case SET_REGISTER_SUCCESS:
      return { loading: false, message: action.payload };
    case SET_REGISTER_ERROR:
      return { loading: false, error: action.payload };
    case SET_ADMIN_LOGIN_REQUEST:
      return { admin_loading: true };
    case SET_ADMIN_LOGIN_SUCCESS:
      return { admin_loading: false, user: action.payload };
    case SET_ADMIN_LOGIN_ERROR:
      return { admin_loading: false, admin_error: action.payload };
      case SET_SUB_LOGIN_REQUEST:
        return { sub_loading: true };
      case SET_SUB_LOGIN_SUCCESS:
        return { sub_loading: false, user: action.payload };
      case SET_SUB_LOGIN_ERROR:
        return { sub_loading: false, sub_error: action.payload };
    default:
      return state;
  }
};
