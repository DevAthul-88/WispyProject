import React from 'react'
import Table from '../Table/table.project.ticket'
import { useSelector} from "react-redux";

function index({data , id}) {
  const {userInfo} = useSelector((state) => state.auth)
  return (
    <>
    <Table user={userInfo} projects={data && data.tickets.filter(e => e.project == id)}/>
    </>
  )
}

export default index