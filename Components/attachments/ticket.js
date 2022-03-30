import React from 'react'
import {Text} from '@chakra-ui/react'
import Input from './input'
import Table from '../Table/table.attach'

function ticket({ticket , orgId , data}) {
  return (
    <div>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Tickets attachments</Text>
          <Input ticket={ticket} orgId={orgId}/>
          <Table org={data}/>
    </div>
  )
}

export default ticket