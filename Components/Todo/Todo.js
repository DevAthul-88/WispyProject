import React, { useEffect } from "react";
import Index from "./Index";
import { useRouter } from "next/router";
import Alert from "../noData";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Alerts from '../Alert'
import axios from 'axios'
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
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import TodoSchema from "../../Validation/todo";
import { Formik, Form, Field } from "formik";

function Todo({ users }) {
  const router = useRouter()
  const { userInfo } = useSelector((state) => state.auth);
  const { data } = useSelector((state) => state.org);
  const [loading , setLoading] = React.useState(false)
  const [message , setMessage] = React.useState("")
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
     <Index orgId={data._id}/>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              message && <Alerts type={"error"} description={Alerts} trigger/>
            }
            <Flex justify={"center"}>
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  userId:userInfo._id,
                  orgId: data._id,
                  projectId:router.query.slug,
                  isCompleted:false
                }}
                validationSchema={TodoSchema}
                onSubmit={(values, { resetForm } )  =>  {
                   async function createTodo(){
                     setLoading(true)
                    const {data} = await axios.post("/api/org/todo" , values)
                    if(data.error){
                      setLoading(false)
                      setMessage(data.error)
                    }
                    if(data.success){
                      setLoading(false)
                      resetForm()
                    }
                   }
                   createTodo()
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

                      <FormControl marginTop={"5"}>
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
                        <Button colorScheme="messenger" type="submit" isLoading={loading}>Create</Button>
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
