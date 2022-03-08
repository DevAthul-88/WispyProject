import {
  Button,
  Checkbox,
  Flex,
  Select,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create new account</Heading>
          <FormControl id="email" >
            <FormLabel>Email address</FormLabel>
            <Input type="email" focusBorderColor={"messenger.500"}/>
          </FormControl>
          <FormLabel>Select role</FormLabel>
          <Select placeholder="Select role" focusBorderColor={"messenger.500"}>
            <option value="admin">Admin</option>
            <option value="developer">Developer</option>
            <option value="manger">Project manager</option>
            <option value="submitter">Submitter</option>
          </Select>
          <FormControl id="password">
            <FormLabel>Your organization name</FormLabel>
            <Input type="password" focusBorderColor={"messenger.500"}/>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" focusBorderColor={"messenger.500"}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Link color={"messenger.500"}>Forgot password?</Link>
            </Stack>
            <Button colorScheme={"messenger"} variant={"solid"}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/image_3.webp"} />
      </Flex>
    </Stack>
  );
}
