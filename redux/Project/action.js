import {
  SET_PROJECT_REQUEST,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_ERROR,
  SET_PROJECT_EDIT_REQUEST,
  SET_PROJECT_EDIT_SUCCESS,
  SET_PROJECT_EDIT_ERROR,
} from "./type";
import axios from "axios";

export const createProject = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: SET_PROJECT_REQUEST });
    const { data } = await axios.post("/api/project/create", credentials);
    if (data.refresh) {
      dispatch({ type: SET_PROJECT_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: SET_PROJECT_ERROR, payload: error.message });
  }
};

export const editProject = (credentials) => async (dispatch) => {
    try {
      dispatch({ type: SET_PROJECT_EDIT_REQUEST });
      const { data } = await axios.put("/api/project/create", credentials);
      if (data.refresh) {
        dispatch({ type: SET_PROJECT_EDIT_SUCCESS });
      }
    } catch (error) {
      dispatch({ type: SET_PROJECT_EDIT_ERROR , payload: error.message });
    }
  };