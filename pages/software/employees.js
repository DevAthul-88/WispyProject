import React, { useEffect } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import  {fetchData} from '../../redux/org/action'

function employees() {
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchData(userInfo._id))
  },[])

  return (
    <div>employees</div>
  )
}

export default employees