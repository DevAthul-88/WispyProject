import {
  GET_ORG_REQUEST,
  GET_ORG_SUCCESS,
  GET_ORG_ERROR,
  SET_EMP_REQUEST,
  SET_EMP_SUCCESS,
  SET_EMP_ERROR,
} from "./type";

const initialState = {};

export const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORG_REQUEST:
      return { loading: true };
    case GET_ORG_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORG_ERROR:
      return { loading: false, error: action.payload };
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
