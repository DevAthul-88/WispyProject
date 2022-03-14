import {
  GET_ORG_REQUEST,
  GET_ORG_SUCCESS,
  GET_ORG_ERROR,
  SET_EMP_REQUEST,
  SET_EMP_SUCCESS,
  SET_EMP_ERROR,
} from "./type";
import axios from "axios";

export const fetchData = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: GET_ORG_REQUEST });

    const { data } = await axios.get(`/api/org/${credentials}`);
    if (data.error)
      return dispatch({ type: GET_ORG_ERROR, payload: data.error });
    dispatch({ type: GET_ORG_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: GET_ORG_ERROR });
  }
};

export const createEmp = (credentials) => async (dispatch) => {
  try {
      dispatch({ type:SET_EMP_REQUEST})

      const {data} = await axios.post("/api/org/emp" , credentials)
      if(data.error) return dispatch({ type:SET_EMP_ERROR , payload: data.error });
      dispatch({type:SET_EMP_SUCCESS});
        console.log(data);
      // if(data.refresh)  {
      //   const { data } = await axios.get(`/api/org/${credentials}`);
      //   dispatch({ type: GET_ORG_SUCCESS, payload: data.data });
      // }

  } catch (error) {
      dispatch({ type:SET_EMP_ERROR , set_emp_error: error.message})
  }
};
