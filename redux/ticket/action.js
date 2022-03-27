import {
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_LOADING,
  TICKET_CREATE_FAILURE,
} from "./type";
import axios from "axios";

export const ticketCreateAction = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_CREATE_LOADING });
    const { data } = await axios.post("/api/ticket/index", credentials);
    if (data.error) {
      return dispatch({ type: TICKET_CREATE_FAILURE, payload: data.error });
    }
    if (data.reload) {
      dispatch({ type: TICKET_CREATE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: TICKET_CREATE_FAILURE, payload: error.message });
  }
};
