import { useState } from "react";
import "../styles/globals.css";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import Store from "../redux/store";

function MyApp({ Component, pageProps }) {
  const [auth, setAuth] = useState(false);
  return (
    <Provider store={Store}>
      <ChakraProvider>
        {auth ? <Sidebar /> : <Navbar />}
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
