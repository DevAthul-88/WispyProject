import React, { useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import  {fetchData} from '../../redux/org/action'
import Loader from '../../Components/Loader'

function employees() {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth)
  const {data , error , loading} = useSelector((state) => state.org)

  useEffect(() => {
    dispatch(fetchData(userInfo._id))
  },[])

  return (
    <>
    {loading ? <Loader /> : <>
     Loaded
    </>}
    </>
  )
}

export default employees