import { GET_ORG_REQUEST, GET_ORG_SUCCESS, GET_ORG_ERROR } from "./type";
import axios from 'axios'


export const fetchData = (credentials) => async (dispatch) => {
 try {
  dispatch({ type:GET_ORG_REQUEST})
 
  const {data} = await axios.post(`/api/org/emp` , credentials) 
  if(data.error) return dispatch({type:GET_ORG_ERROR , payload:data.error})
  dispatch({type:GET_ORG_SUCCESS , payload:data.data})   
 } catch (error) {
     dispatch({type:GET_ORG_ERROR})
 }
}