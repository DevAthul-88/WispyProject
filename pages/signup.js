import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import SignupSchema from "../Validation/signup";

export default function SplitScreen() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Head>
        <title>WispyProject - Sign up</title>
      </Head>

      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            org: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => {
            // same shape as initial values
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <Form>
                <Heading fontSize={"2xl"} marginBottom={"4"}>
                  Create a new account
                </Heading>
                <FormControl id="email" marginTop={"5"}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    focusBorderColor={"messenger.500"}
                  />
                  {errors.email && touched.email ? (
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  ) : null}
                </FormControl>
                <FormControl id="password" marginTop={"5"}>
                  <FormLabel>Your organization name</FormLabel>
                  <Input type="password" focusBorderColor={"messenger.500"} />
                </FormControl>
                <FormControl id="password" marginTop={"5"}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" focusBorderColor={"messenger.500"} />
                </FormControl>
                <Stack spacing={6} marginTop={"5"}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Link color={"messenger.500"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme={"messenger"}
                    variant={"solid"}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Form>
            </Stack>
          )}
        </Formik>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/image_3.webp"} />
      </Flex>
    </Stack>
  );
}
