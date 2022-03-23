import {
  SET_PROJECT_REQUEST,
  SET_PROJECT_SUCCESS,
  SET_PROJECT_ERROR,
  SET_PROJECT_EDIT_REQUEST,
  SET_PROJECT_EDIT_SUCCESS,
  SET_PROJECT_EDIT_ERROR,
} from "./type";

const initialState = {};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_REQUEST:
      return { loading: true };
    case SET_PROJECT_SUCCESS:
      return { loading: false, reload: true };
    case SET_PROJECT_ERROR:
      return { loading: false, error: action.payload };
    case SET_PROJECT_EDIT_REQUEST:
      return { loading_project: true };
    case SET_PROJECT_EDIT_SUCCESS:
      return { loading_project: false, reload: true };
    case SET_PROJECT_EDIT_ERROR:
      return { loading_project: false, error_project: action.payload };
    default:
      return state;
  }
};
