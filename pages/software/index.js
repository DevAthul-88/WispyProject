import React from 'react'
import {Container} from '@chakra-ui/react'
import Head from 'next/head'
import User from '../../lib/user'
import {BarChart} from '../../Components/Charts/Bar'

function index() {
  return (
   <Container maxW={"container.sm"}>
     <Head>
       <title>WispyProject - Dashboard</title>
     </Head>
     <BarChart />
   </Container>
  )
}

export default index


