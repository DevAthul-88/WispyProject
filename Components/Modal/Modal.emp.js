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
import { createEmp } from "../../redux/employee/action";

function Model({ toggle, setToggle, name }) {
  const dispatch = useDispatch();
  const { set_emp_loading, set_emp_error, refresh } = useSelector(
    (state) => state.emp
  );
  const { userInfo } = useSelector((state) => state.auth);
  const options = [
    { value: "MODERATOR", label: "Moderator" },
    { value: "DEVELOPER", label: "Developer" },
    { value: "SUBMITTER", label: "Submitter" },
    { value: "PROJECT_MANAGER", label: "Project Manger" },
  ];

  return (
    <>
      <Modal isOpen={toggle} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add employees</ModalHeader>
          <ModalBody>
            {set_emp_error && (
              <Alert
                trigger={true}
                type={"error"}
                description={set_emp_error}
              />
            )}
            <Flex justify={"center"}>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  role: "",
                  emp_id: "",
                  org: name,
                  userId: userInfo && userInfo._id,
                }}
                validationSchema={EmpSchema}
                onSubmit={(values, { resetForm }) => {
                  dispatch(createEmp(values));

                  
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
                          as={customSelectorComponent}
                          name={"role"}
                          borderColor={
                            errors.role && touched.role ? "red.500" : "gray.300"
                          }
                        >
                          {options.map((e, index) => {
                            return (
                              <option value={e.value} key={index}>
                                {e.label}
                              </option>
                            );
                          })}
                        </Field>

                        {errors.role && touched.role ? (
                          <FormLabel color={"red.600"}>{errors.role}</FormLabel>
                        ) : (
                          ""
                        )}
                      </FormControl>
                      <FormControl marginTop={"5"}>
                        <FormLabel>Employee ID</FormLabel>
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
                      <ModalFooter>
                        <Button
                          colorScheme="red"
                          mr={3}
                          onClick={() => setToggle(!toggle)}
                        >
                          Close
                        </Button>
                        <Button
                          colorScheme={"messenger"}
                          type="submit"
                          isLoading={set_emp_loading}
                        >
                          Save
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
  );
}

export default Model;

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);

const customSelectorComponent = (props) => (
  <Select {...props} placeholder="Select role" />
);
