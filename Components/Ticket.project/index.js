import React from 'react'
import Table from '../Table/table.project.ticket'
import { useSelector} from "react-redux";

function index({data}) {
  const {userInfo} = useSelector((state) => state.auth)
  console.log(data);
  return (
    <>
    <Table user={userInfo} projects={data.tickets}/>
    </>
  )
}

export default index