import React from "react";
import Index from "./Index";
import Alert from "../noData";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
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
  Textarea,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import TodoSchema from "../../Validation/todo";
import { Formik, Form, Field } from "formik";

function Todo({ todo, users }) {
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.org);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <Flex justify={"space-between"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Todos
        </Text>
        {userInfo !== null && userInfo !== undefined ? (
          <>
            {userInfo.role === "ADMIN" ||
            userInfo.role === "PROJECT_MANAGER" ? (
              <Button
                colorScheme={"messenger"}
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                Add todo
              </Button>
            ) : (
              <>
                {users.includes((e) => e.id === userInfo._id) ? (
                  <Button
                    colorScheme={"messenger"}
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                  >
                    Add todo
                  </Button>
                ) : null}
              </>
            )}
          </>
        ) : null}
      </Flex>
      {todo.length <= 1 ? <Alert title={"No todos found!"} /> : <Index />}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify={"center"}>
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  userId:userInfo._id,
                  orgId: data._id,
                  isCompleted:false
                }}
                validationSchema={TodoSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Stack spacing={4} w={"full"} maxW={"md"}>
                    <Form>
                      <FormControl marginTop={"5"}>
                        <FormLabel>Todo title</FormLabel>
                        <Field
                          name="title"
                          as={CustomInputComponent}
                          type={"text"}
                          focusBorderColor={"messenger.500"}
                          borderColor={
                            errors.title && touched.title
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.title && touched.title ? (
                          <FormLabel color={"red.600"}>
                            {errors.title}
                          </FormLabel>
                        ) : (
                          ""
                        )}
                      </FormControl>

                      <FormControl id="email" marginTop={"5"}>
                        <FormLabel>Todo description</FormLabel>
                        <Field
                          name="description"
                          as={CustomInputComponent}
                          focusBorderColor={"messenger.500"}
                          borderColor={
                            errors.description && touched.description
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.description && touched.description ? (
                          <FormLabel color={"red.600"}>
                            {errors.description}
                          </FormLabel>
                        ) : (
                          ""
                        )}
                      </FormControl>

                      <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                          Close
                        </Button>
                        <Button colorScheme="messenger">Save</Button>
                      </ModalFooter>
                    </Form>
                  </Stack>
                )}
              </Formik>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);

export default Todo;
