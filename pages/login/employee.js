import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { Formik, Form, Field } from "formik";
import LoginSchema from "../../Validation/login";
import { useDispatch, useSelector } from "react-redux";
import { submitterLoginAction } from "../../redux/auth/action";
import Alert from "../../Components/Alert";
import { useEffect } from "react";
import User from "../../lib/user";
import Router from "next/router";

export default function SplitScreen() {
  const dispatch = useDispatch();
  const { sub_loading, sub_error, sub_message, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user.token));
      localStorage.setItem("userInfo", JSON.stringify(user.userInfo));
      window.location.href = "/software/";
    }

    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      Router.push("/software/");
    }
  }, [user]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Head>
        <title>WispyProject - Login</title>
      </Head>

      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Formik
          initialValues={{
            email: "",
            org: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(submitterLoginAction(values));
            if (sub_error) {
            } else {
              resetForm();
            }
          }}
        >
          {({ errors, touched }) => (
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <NextLink href="/login">
                <Link textDecoration="underline">Go Back</Link>
              </NextLink>

              {sub_error && (
                <Alert trigger={true} type={"error"} description={sub_error} />
              )}
              {sub_message && (
                <Alert
                  trigger={true}
                  type={"success"}
                  description={sub_message}
                />
              )}

              <Form>
                <Heading fontSize={"2xl"} marginBottom={"4"}>
                  Login with your account
                </Heading>

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
                    isLoading={sub_loading}
                  >
                    Log in
                  </Button>
                </Stack>
              </Form>
            </Stack>
          )}
        </Formik>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Login Image"} objectFit={"cover"} src={"/image_4.jpg"} />
      </Flex>
    </Stack>
  );
}
const CustomInputComponent = (props) => <Input type={props.type} {...props} />;

export const getServerSideProps = () => {
  if (User() !== undefined) {
    return {
      redirect: {
        destination: "/software/",
        permanent: false,
      },
      props: {},
    };
  }
  return { props: {} };
};
