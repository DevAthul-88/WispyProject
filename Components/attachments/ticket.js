import React from 'react'
import {Text} from '@chakra-ui/react'
import Input from './input'

function ticket() {
  return (
    <div>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Tickets attachments</Text>
          <Input />
    </div>
  )
}

export default ticket