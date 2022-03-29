import {
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_LOADING,
  TICKET_CREATE_FAILURE,
  TICKET_EDIT_LOADING,
  TICKET_EDIT_SUCCESS,
  TICKET_EDIT_FAILURE,
} from "./type";

const initialState = {};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICKET_CREATE_LOADING:
      return { loading: true };
    case TICKET_CREATE_SUCCESS:
      return { loading: false, reload: true };
    case TICKET_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case TICKET_EDIT_LOADING:
      return { edit_loading: true };
    case TICKET_EDIT_SUCCESS:
      return { edit_loading: true, edit_reload: true };
    case TICKET_EDIT_FAILURE:
      return { edit_loading: false, edit_error: action.payload };
    default:
      return state;
  }
};

export default ticketReducer;
