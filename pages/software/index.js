import React from 'react'
import {Container , Flex , Box} from '@chakra-ui/react'
import Head from 'next/head'
import User from '../../lib/user'
import {BarChart} from '../../Components/Charts/Bar'
import {PieChart} from '../../Components/Charts/Pie'

function index() {
  return (
   <Container maxWidth={"container.lg"} marginRight={"14"}>
     <Head>
       <title>WispyProject - Dashboard</title>
     </Head>

     <Box borderWidth={"thin"}  padding={"2"}>
     <BarChart />
     </Box>

     <Flex  marginTop={"10"}>
     <Box borderWidth={"thin"}  padding={"2"} width={"full"}>
     <BarChart />
     </Box>
     <Box height={"sm"}  borderWidth={"thin"} padding={"2"} width={"full"}>
     <PieChart />
     </Box>
     </Flex>
   
   </Container>
  )
}

export default index


