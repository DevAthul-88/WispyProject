import { SET_EMP_REQUEST, SET_EMP_SUCCESS, SET_EMP_ERROR } from "./type";

const initialState = {};

export const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMP_REQUEST:
      return { set_emp_loading: true };
    case SET_EMP_SUCCESS:
      return { set_emp_loading: false };
    case SET_EMP_ERROR:
      return { set_emp_loading: false, set_emp_error: action.payload };
    default:
      return state;
  }
};
