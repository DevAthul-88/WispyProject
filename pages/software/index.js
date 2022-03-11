import React from 'react'
import {Container , Flex} from '@chakra-ui/react'
import Head from 'next/head'
import User from '../../lib/user'
import {BarChart} from '../../Components/Charts/Bar'
import {PieChart} from '../../Components/Charts/Pie'

function index() {
  return (
   <Container maxWidth={"container.sm"}>
     <Head>
       <title>WispyProject - Dashboard</title>
     </Head>
     <Flex>
     <BarChart />
     <PieChart />
     </Flex>
   </Container>
  )
}

export default index


