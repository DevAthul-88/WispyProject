import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Head from 'next/head';
import {useEffect , useState} from 'react'
import Router from 'next/router'

export default function SplitScreen() {
  const [auth , setAuth] = useState(true)

  useEffect(() => {
    if(auth){
      Router.push("/software/")
    }
  }, [])
  

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      
      <Head>
        <title>WispyProject - Home</title>
      </Head>
      
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "messenger.200",
                zIndex: -1,
              }}
            >
              WispyProject
            </Text>
            <br />{" "}
            <Text color={"messenger.500"} as={"span"}>
              Track Projects
            </Text>{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
          WispyProject is a free, open-source bug tracking and project management
            system. It's perfect for freelancers, agencies, and moonlighters.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button rounded={"full"} colorScheme={"messenger"}>
              Get Started
            </Button>
            <Button rounded={"full"}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src='/image_2.jpg' />
      </Flex>
    </Stack>
  );
}
