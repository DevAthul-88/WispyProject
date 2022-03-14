import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import EmpSchema from "../../Validation/emp_add";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert";

function Model({ toggle, setToggle }) {
  return (
    <>
      <Modal isOpen={toggle} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add employees</ModalHeader>
          <ModalBody>
            <Flex justify={"center"}>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  role: "",
                  emp_id: "",
                }}
                validationSchema={EmpSchema}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
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

                      <FormControl id="email" marginTop={"5"}>
                        <FormLabel>Email address</FormLabel>
                        <Field
                          name="email"
                          as={CustomInputComponent}
                          type={"email"}
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
                      <FormControl marginTop={"5"}>
                        <FormLabel>Select role</FormLabel>
                        <Field
                          name="role"
                          as={CustomSelectComponent}
                          borderColor={
                            errors.role && touched.role ? "red.500" : "gray.300"
                          }
                        />

                        {errors.role && touched.role ? (
                          <FormLabel color={"red.600"}>
                            {errors.role}
                          </FormLabel>
                        ) : (
                          ""
                        )}
                      </FormControl>
                      <FormControl marginTop={"5"}>
                        <FormLabel>Password</FormLabel>
                        <Field
                          name="emp_id"
                          as={CustomInputComponent}
                          type={"password"}
                          focusBorderColor={"messenger.500"}
                          borderColor={
                            errors.emp_id && touched.emp_id
                              ? "red.500"
                              : "gray.300"
                          }
                        />
                        {errors.emp_id && touched.emp_id ? (
                          <FormLabel color={"red.600"}>
                            {errors.emp_id}
                          </FormLabel>
                        ) : (
                          ""
                        )}
                      </FormControl>
                    </Form>
                    <ModalFooter>
                      <Button
                        colorScheme="red"
                        mr={3}
                        onClick={() => setToggle(!toggle)}
                      >
                        Close
                      </Button>
                      <Button colorScheme={"messenger"} type="submit">
                        Save
                      </Button>
                    </ModalFooter>
                  </Stack>
                )}
              </Formik>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Model;

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);

const CustomSelectComponent = (props) => (
  <Select placeholder="Select role" colorScheme={"messenger"}>
    <option value="developer">Developer</option>
    <option value="project_manager">Project manager</option>
    <option value="submitter">Submitter</option>
  </Select>
);
