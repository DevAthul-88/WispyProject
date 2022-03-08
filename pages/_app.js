import { useState } from 'react'
import '../styles/globals.css';
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import {ChakraProvider} from '@chakra-ui/react'


function MyApp({ Component, pageProps }) {
  const [auth , setAuth] = useState(true)
  return (
    <ChakraProvider>
    {auth ? <Sidebar /> : <Navbar />}
    <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
