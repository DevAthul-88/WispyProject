import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { Formik, Form, Field } from "formik";
import LoginSchema from "../../Validation/login";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginAction } from "../../redux/auth/action";
import Alert from "../../Components/Alert";
import { useEffect , useState} from "react";
import User from '../../lib/user'
import Router from "next/router";
import {ViewIcon , ViewOffIcon} from '@chakra-ui/icons'
import Footer from '../../Components/Footer'
export default function SplitScreen() {
  const dispatch = useDispatch();
  const { admin_loading, admin_error, admin_message, user } = useSelector(
    (state) => state.auth
  );
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", JSON.stringify(user.token));
      localStorage.setItem("userInfo", JSON.stringify(user.userInfo));
      window.location.href = "/software/"
    }

    const token = JSON.parse(localStorage.getItem("token"));
    if(token){
      Router.push("/software/")
    }

  }, [user]);

  return (
    <>
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
            dispatch(adminLoginAction(values));
            if(admin_error){

            }else{
              resetForm();
            }

          }}
        >
          {({ errors, touched }) => (
            <Stack spacing={4} w={"full"} maxW={"md"}>
              <NextLink href="/login">
                <Link textDecoration="underline">Go Back</Link>
              </NextLink>

              {admin_error && (
                <Alert
                  trigger={true}
                  type={"error"}
                  description={admin_error}
                />
              )}
              {admin_message && (
                <Alert
                  trigger={true}
                  type={"success"}
                  description={admin_message}
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
                  <InputGroup>
                  <Field
                    name="password"
                    as={CustomInputComponent}
                    type={show ? 'text' : 'password'}
                    focusBorderColor={"messenger.500"}
                    borderColor={
                      errors.password && touched.password
                        ? "red.500"
                        : "gray.300"
                    }
                  />
                   <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={() => {setShow(!show)}}>
                        {show ? <ViewIcon /> : <ViewOffIcon/>}
                      </Button>
                    </InputRightElement>
                    </InputGroup>
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
    
                  </Stack>
                  <Button
                    type="submit"
                    colorScheme={"messenger"}
                    variant={"solid"}
                    isLoading={admin_loading}
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
    <Footer />
    </>
  );
}
const CustomInputComponent = (props) => <Input type={props.type} {...props} />;

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