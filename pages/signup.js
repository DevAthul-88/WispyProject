import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import Head from "next/head";
import { Formik, Form, Field } from "formik";
import SignupSchema from "../Validation/signup";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../redux/auth/action";
import Alert from "../Components/Alert";

export default function SplitScreen() {
  const dispatch = useDispatch();
  const { loading, error , message } = useSelector((state) => state.auth);
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
          onSubmit={(values , {resetForm}) => {
            dispatch(registerAction(values));
            resetForm()
          }}
        >
          {({ errors, touched }) => (
            <Stack spacing={4} w={"full"} maxW={"md"}>
              {error && (
                <Alert
                  trigger={true}
                  type={"error"}
                  description={error}
                />
              )}
               {message && (
                <Alert
                  trigger={true}
                  type={"success"}
                  description={message}
                />
              )}

              <Form>
                <Heading fontSize={"2xl"} marginBottom={"4"}>
                  Create a new account
                </Heading>

                <FormControl marginTop={"5"}>
                  <FormLabel>Username</FormLabel>
                  <Field
                    name="username"
                    as={CustomInputComponent}
                    type={"text"}
                    focusBorderColor={"messenger.500"}
                    borderColor={
                      errors.username && touched.username
                        ? "red.500"
                        : "gray.300"
                    }
                  />
                  {errors.username && touched.username ? (
                    <FormLabel color={"red.600"}>{errors.username}</FormLabel>
                  ) : (
                    ""
                  )}
                </FormControl>

                <FormControl id="email" marginTop={"5"}>
                  <FormLabel>Email address</FormLabel>
                  <Field
                    name="email"
                    as={CustomInputComponent}
                    type={"email"}
                    focusBorderColor={"messenger.500"}
                    borderColor={
                      errors.email && touched.email ? "red.500" : "gray.300"
                    }
                  />
                  {errors.email && touched.email ? (
                    <FormLabel color={"red.600"}>{errors.email}</FormLabel>
                  ) : (
                    ""
                  )}
                </FormControl>

                <FormControl marginTop={"5"}>
                  <FormLabel>Your organization name</FormLabel>
                  <Field
                    name="org"
                    as={CustomInputComponent}
                    type={"text"}
                    focusBorderColor={"messenger.500"}
                    borderColor={
                      errors.org && touched.org ? "red.500" : "gray.300"
                    }
                  />
                  {errors.org && touched.org ? (
                    <FormLabel color={"red.600"}>{errors.org}</FormLabel>
                  ) : (
                    ""
                  )}
                </FormControl>
                <FormControl marginTop={"5"}>
                  <FormLabel>Password</FormLabel>
                  <Field
                    name="password"
                    as={CustomInputComponent}
                    type={"password"}
                    focusBorderColor={"messenger.500"}
                    borderColor={
                      errors.password && touched.password
                        ? "red.500"
                        : "gray.300"
                    }
                  />
                  {errors.password && touched.password ? (
                    <FormLabel color={"red.600"}>{errors.password}</FormLabel>
                  ) : (
                    ""
                  )}
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
                    isLoading={loading}
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

const CustomInputComponent = (props) => <Input type={props.type} {...props} />;
