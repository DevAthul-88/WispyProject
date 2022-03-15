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
  import ProjectSchema from "../../Validation/project_add";
  import { useDispatch, useSelector } from "react-redux";
  import Alert from "../../Components/Alert";
  import { createEmp } from "../../redux/employee/action";
  
  function Model({ toggle, setToggle, name }) {
    const dispatch = useDispatch();
    const { set_emp_loading, set_emp_error , refresh } = useSelector((state) => state.emp);
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
              {set_emp_error && <Alert trigger={true} type={"error"} description={set_emp_error}/>}
              <Flex justify={"center"}>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    members: [],
                    priority: "",
                  }}
                  validationSchema={ProjectSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log(values);
                    
                  }}
                >
                  {({ errors, touched }) => (
                    <Stack spacing={4} w={"full"} maxW={"md"}>
                      <Form>
                        <FormControl marginTop={"5"}>
                          <FormLabel>Project title</FormLabel>
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
                          <FormLabel>Project description</FormLabel>
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
                        <FormControl marginTop={"5"}>
                          <FormLabel>Select members to assign</FormLabel>
                          <Field
                            as={customSelectorComponent}
                            name={"members"}
                            multiple={true}
                            
                            borderColor={
                              errors.members && touched.members ? "red.500" : "gray.300"
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
  
                          {errors.members && touched.members ? (
                            <FormLabel color={"red.600"}>{errors.members}</FormLabel>
                          ) : (
                            ""
                          )}
                        </FormControl>


                        <FormControl marginTop={"5"}>
                          <FormLabel>Select priority</FormLabel>
                          <Field
                            as={customSelectorComponent2}
                            name={"priority"}
                            borderColor={
                              errors.priority && touched.priority ? "red.500" : "gray.300"
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
  
                          {errors.priority && touched.priority ? (
                            <FormLabel color={"red.600"}>{errors.priority}</FormLabel>
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
    <Select {...props} placeholder="Select role" icon={"none"} height={"5rem"}/>
  );
  const customSelectorComponent2 = (props) => (
    <Select {...props} placeholder="Select role" />
  );