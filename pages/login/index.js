import {
  Button,
  Flex,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import User from '../../lib/user'
import Router from "next/router";
import { useEffect } from "react";

export default function SplitScreen() {
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
      Router.push("/software/")
    }
  },[])

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Head>
        <title>WispyProject - Login</title>
      </Head>

      <Flex p={8} flex={1} direction={"column"}  justify={"center"}>
        <Text fontSize={"2xl"} marginBottom="5">Select your account type</Text>
          <Stack >
            <Text fontSize={"2xl"} >
              Login as admin
            </Text>
           <Link href={"/login/admin"}>
           <Button colorScheme={"messenger"} variant={"outline"}>Get started</Button>
           </Link>
          </Stack>

         

          <Stack marginTop={"8"} >
            <Text fontSize={"2xl"} >
              Login as employee
            </Text>
           <Link href={"/login/employee"}>
           <Button colorScheme={"facebook"}  variant={"outline"}>Get started</Button>
           </Link>
          </Stack>
        
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/image_4.jpg"} />
      </Flex>
    </Stack>
  );
}

export const getServerSideProps = () => {
  
  if(User() !== undefined) {
    return {
      redirect: {
        destination: "/software/",
        permanent: false,
      },
      props: {},
    };
  }
  return {props:{}}
}