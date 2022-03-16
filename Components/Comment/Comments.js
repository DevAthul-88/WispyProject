import React from 'react';
import Message from '../../Components/noData';
import {Box, Avatar , Text , Flex , Link , Button}  from '@chakra-ui/react'
import { format } from 'timeago.js';
import NextLink from 'next/link'
import { useSelector } from "react-redux";

function Comments({comment}) {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      {
        comment.length <= 0 ? <Message title={"no comments"}/> : <div>
         {
           comment.map((e , index) => {
            return (
              <Box borderWidth={"thin"} borderRadius="md" padding={"4"} maxW="xl" key={index} marginTop={"2"}>
            <Flex>
            <Avatar name={e.username}/>
             <Link verticalAlign={"bottom"} margin="2" display={"block"} as={NextLink} href={`/profile/${e.userId}`}>{e.username}</Link>
            
            </Flex>
            <Text marginTop={"5"}>
            {e.comment}
            </Text>
            <Flex justify={"space-between"}>
            <Text marginTop={"2"}>{format(e.createAt)}</Text>
             {
               userInfo._id == e.userId ? <Button colorScheme={"red"} size="sm">Delete</Button> : null
             }
            </Flex>
          </Box>
            )
           })
         }
        </div>
      }
    </div>
  )
}

export default Comments