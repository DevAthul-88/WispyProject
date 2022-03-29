import React from 'react'
import {Input , Heading} from '@chakra-ui/react'

function ticket() {
  return (
    <div>
          <Heading>Add attachments</Heading>
        <Input placeholder='Basic usage' type="file"/>
    </div>
  )
}

export default ticket