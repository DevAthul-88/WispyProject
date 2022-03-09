import React from 'react'
import {Container} from '@chakra-ui/react'
import Head from 'next/head'

function index() {
  return (
   <Container maxW={"container.sm"}>
     <Head>
       <title>WispyProject - Dashboard</title>
     </Head>
     Index
   </Container>
  )
}

export default index