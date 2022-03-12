import { GET_ORG_REQUEST, GET_ORG_SUCCESS, GET_ORG_ERROR } from "./type";

const initialState = {};

export const orgReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORG_REQUEST:
      return { loading: true };
    case GET_ORG_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORG_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
