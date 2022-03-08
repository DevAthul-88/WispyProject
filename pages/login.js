import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import Head from 'next/head'

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      
      <Head>
          <title>TryBug - Login</title>
      </Head>
      
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Login with your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" focusBorderColor={"messenger.500"} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Your organization name</FormLabel>
            <Input type="password" focusBorderColor={"messenger.500"} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Employee ID</FormLabel>
            <Input type="password" focusBorderColor={"messenger.500"} />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={"messenger"} variant={"solid"}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/image_4.jpg"} />
      </Flex>
    </Stack>
  );
}
