import React from 'react';
import Message from '../../Components/noData';
import {Box, Avatar , Text , Flex , Link}  from '@chakra-ui/react'

function Comments({comment}) {
  console.log(comment);
  return (
    <div>
      {
        comment.length <= 0 ? <Message title={"no comments"}/> : <div>
          <Box borderWidth={"thin"} borderRadius="md" padding={"4"} maxW="xl">
            <Flex>
            <Avatar name="comments"/>
             <Link verticalAlign={"bottom"} margin="2">Comments</Link>
            
            </Flex>
            <Text marginTop={"5"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis commodi quos possimus sequi beatae placeat maiores non, laborum iure ullam quia. Beatae, nulla? Officia odit repudiandae veniam id laboriosam eveniet.
            </Text>
            <Text marginTop={"2"}>{Date.now()}</Text>
          </Box>
        </div>
      }
    </div>
  )
}

export default Comments