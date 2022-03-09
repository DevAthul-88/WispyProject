import {
    SET_REGISTER_REQUEST,
    SET_REGISTER_SUCCESS,
    SET_REGISTER_ERROR,
} from "./type";
import axios from 'axios';

export const registerAction = (credentials) =>  (dispatch) => {
    try {
        dispatch({type:SET_REGISTER_REQUEST})
        
    } catch (error) {
        dispatch({type:SET_REGISTER_ERROR , payload:error.message});
    }
}