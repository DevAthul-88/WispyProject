import {
  SET_PROJECT_REQUEST,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_ERROR,
} from "./type";
import axios from 'axios';

export const createProject = (credentials) => async (dispatch) => {
    try {
        dispatch({type:SET_PROJECT_REQUEST})
        const {data} = await axios.post("/api/project/create" , credentials)
    } catch (error) {
        dispatch({type:SET_PROJECT_ERROR , payload:error.message})
    }
}
