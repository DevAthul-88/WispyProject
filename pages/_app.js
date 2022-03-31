import { useState , useEffect} from "react";
import "../styles/globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "../redux/store";
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if(token){
        setAuth(true)
    } 
  },[])


  return (
    <Provider store={Store}>
      <Head>
        <link rel="shortcut icon" href="/favicon-32x32.png" type="image/x-icon" />
      </Head>
      <ChakraProvider>
        {auth ? <Sidebar /> : <Navbar />}
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
