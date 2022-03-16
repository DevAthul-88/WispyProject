import React from 'react'
import {Textarea , Button} from '@chakra-ui/react'

function Form() {
  return (
    <div>
       <Textarea placeholder='Describe your comment here'></Textarea>
        <Button marginTop={"5"} colorScheme={"messenger"}>Add Comment</Button>
    </div>
  )
}

export default Form