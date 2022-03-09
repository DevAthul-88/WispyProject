import {
  SET_REGISTER_REQUEST,
  SET_REGISTER_SUCCESS,
  SET_REGISTER_ERROR,
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
    default:
      state;
  }
};
