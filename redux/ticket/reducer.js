import {
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_LOADING,
  TICKET_CREATE_FAILURE,
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
    default:
      return state;
  }
};

export default ticketReducer;