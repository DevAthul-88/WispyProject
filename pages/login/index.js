import {
  Button,
  Flex,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function SplitScreen() {
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
              Login as developer
            </Text>
            <Link href={"/login/developer"}>
            <Button colorScheme={"linkedin"}  variant={"outline"}>Get started</Button>
            </Link>
          </Stack>

          <Stack marginTop={"8"} >
            <Text fontSize={"2xl"} >
              Login as project manager
            </Text>
           <Link href={"/login/manager"}>
           <Button colorScheme={"red"}  variant={"outline"}>Get started</Button>
           </Link>
          </Stack>

          <Stack marginTop={"8"} >
            <Text fontSize={"2xl"} >
              Login as submitter
            </Text>
           <Link href={"/login/submitter"}>
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
