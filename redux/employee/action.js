import { SET_EMP_REQUEST, SET_EMP_SUCCESS, SET_EMP_ERROR } from "./type";
import { GET_ORG_SUCCESS } from "../org/type";
import axios from "axios";

export const createEmp = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: SET_EMP_REQUEST });

    const { data } = await axios.post("/api/org/emp", credentials);
    if (data.error)
      return dispatch({ type: SET_EMP_ERROR, payload: data.error });
    dispatch({ type: SET_EMP_SUCCESS , payload:data.refresh });
  } catch (error) {
    dispatch({ type: SET_EMP_ERROR, set_emp_error: error.message });
  }
};
