import {
  Container,
  Avatar,
  List,
  ListItem,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Modal,
  ModalOverlay,
  Flex,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Alerts from "../../../Components/Alert";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import { format } from "timeago.js";
import { FaHammer } from "react-icons/fa";
import EditSchema from "../../../Validation/profile_admin";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import { fetchData } from "../../../redux/org/action";

function index() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.org);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Head>
        <title>WispyProject - Profile</title>
      </Head>
      <Container maxWidth={"container.lg"} marginRight={"20"}>
        {userInfo && userInfo.role === "ADMIN" ? (
          <>
            <Avatar size="2xl" name={userInfo && userInfo.username} />
            <List marginTop={"5"} spacing={3}>
              <ListItem fontSize={"2xl"}>
                Username: {userInfo && userInfo.username}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Email: {userInfo && userInfo.email}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Role: {userInfo && userInfo.role}
              </ListItem>
              <ListItem fontSize={"2xl"}>
                Created: {userInfo && format(userInfo.createdAt)}
              </ListItem>
            </List>
            <Divider marginTop={"5"} />
            <Button
              marginTop={"5"}
              leftIcon={<FaHammer />}
              colorScheme={"messenger"}
              variant="outline"
              onClick={onOpen}
            >
              Edit Profile
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  {message && (
                    <Alerts type={"error"} description={Alerts} trigger />
                  )}
                  <Flex justify={"center"}>
                    <Formik
                      initialValues={{
                        username: userInfo.username,
                        email: userInfo.email,
                        userId: userInfo._id,
                      }}
                      validationSchema={EditSchema}
                      onSubmit={(values, { resetForm }) => {
                        async function createTodo() {
                          setLoading(true);
                          const { data } = await axios.post(
                            "/api/org/edit",
                            values
                          );
                          if (data.error) {
                            setLoading(false);
                            setMessage(data.error);
                          }
                          if (data.success) {     
                            setLoading(false);
                            if (typeof window !== "undefined") {
                              localStorage.setItem("userInfo" , JSON.stringify(data.user))
                              window.location.reload()
                            }
                            
                            resetForm();
                          }
                        }
                        createTodo();
                      }}
                    >
                      {({ errors, touched }) => (
                        <Stack spacing={4} w={"full"} maxW={"md"}>
                          <Form>
                            <FormControl marginTop={"5"}>
                              <FormLabel>Username</FormLabel>
                              <Field
                                name="username"
                                as={CustomInputComponent}
                                type={"text"}
                                defaultValue={userInfo.username}
                                focusBorderColor={"messenger.500"}
                                borderColor={
                                  errors.username && touched.username
                                    ? "red.500"
                                    : "gray.300"
                                }
                              />
                              {errors.username && touched.username ? (
                                <FormLabel color={"red.600"}>
                                  {errors.username}
                                </FormLabel>
                              ) : (
                                ""
                              )}
                            </FormControl>

                            <FormControl marginTop={"5"}>
                              <FormLabel>Email address</FormLabel>
                              <Field
                                name="email"
                                as={CustomInputComponent}
                                defaultValue={userInfo.email}
                                focusBorderColor={"messenger.500"}
                                borderColor={
                                  errors.email && touched.email
                                    ? "red.500"
                                    : "gray.300"
                                }
                              />
                              {errors.email && touched.email ? (
                                <FormLabel color={"red.600"}>
                                  {errors.email}
                                </FormLabel>
                              ) : (
                                ""
                              )}
                            </FormControl>

                            <ModalFooter>
                              <Button
                                colorScheme="red"
                                mr={3}
                                onClick={onClose}
                              >
                                Close
                              </Button>
                              <Button
                                colorScheme="messenger"
                                type="submit"
                                isLoading={loading}
                              >
                                Save changes
                              </Button>
                            </ModalFooter>
                          </Form>
                        </Stack>
                      )}
                    </Formik>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <>
            <Tabs>
              <TabList>
                <Tab>One</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        )}
      </Container>
    </>
  );
}

export default index;

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);
