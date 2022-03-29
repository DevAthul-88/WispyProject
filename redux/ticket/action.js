import {
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_LOADING,
  TICKET_CREATE_FAILURE,
  TICKET_EDIT_LOADING,
  TICKET_EDIT_SUCCESS,
  TICKET_EDIT_FAILURE,
} from "./type";
import axios from "axios";

export const ticketCreateAction = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_CREATE_LOADING });
    const { data } = await axios.post("/api/ticket/", credentials);
    if (data.error) {
      return dispatch({ type: TICKET_CREATE_FAILURE, payload: data.error });
    }
    if (data.refresh) {
      dispatch({ type: TICKET_CREATE_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: TICKET_CREATE_FAILURE, payload: error.message });
  }
};

export const editTicket = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: TICKET_EDIT_LOADING });
    const { data } = await axios.put("/api/ticket/create", credentials);
    if (data.refresh) {
      dispatch({ type: TICKET_EDIT_SUCCESS });
    }
  } catch (error) {
    dispatch({ type: TICKET_EDIT_FAILURE , payload: error.message });
  }
};