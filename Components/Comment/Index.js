import React from 'react'
import {Flex , Stack} from '@chakra-ui/react'
import Comments from './Comments'
import Form from './Form'

function Index({comment}) {
  return (
    <Flex justify={"space-between"} py={{ base: 18, md: 4 }} direction={{base: "column", md: "row" }}>
     <Stack flex={2}>
         <Comments comment={comment}/>
     </Stack>
     <Stack >
         <Form />
     </Stack>
    </Flex>
  )
}

export default Index