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
  import { createProject } from "../../redux/Project/action";
  import { useEffect } from "react";
  
  function Model({ data , de}) {
    console.log(de);
    const dispatch = useDispatch();
    const { loading, error  , reload} = useSelector((state) => state.project);
    const options = [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
      { value: "none", label: "None" },
    ];
  
    const members = data.map((e) => {
      return {
        value: e._id,
        label: e.username,
      };
    });
  
    useEffect(() => {
       if(reload){
         window.location.reload()
       }
    },[reload])
  
    return (
      <>
    
           
              {error && (
                <Alert trigger={true} type={"error"} description={error} />
              )}
      
                <Formik
                  initialValues={{
                    title: de.title,
                    description: de.description,
                    members: new Array(),
                    priority: de.priority,
                    ordId: de._id,
                  }}
                  validationSchema={ProjectSchema}
                  onSubmit={(values, { resetForm }) => {
                    dispatch(createProject(values));
                    resetForm()
                  }}
                >
                  {({ errors, touched }) => (
                    <Stack spacing={4} w={"full"}>
                      <Form>
                        <FormControl marginTop={"5"}>
                          <FormLabel>Project title</FormLabel>
                          <Field
                            name="title"
                            value={de.title}
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
                           value={de.description}
                           
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
                            borderColor={
                              errors.members && touched.members
                                ? "red.500"
                                : "gray.300"
                            }
                          >
                            {members.map((e, index) => {
                              return (
                                <option value={e.value} key={index}>
                                  {e.label}
                                </option>
                              );
                            })}
                          </Field>
  
                          {errors.members && touched.members ? (
                            <FormLabel color={"red.600"}>
                              {errors.members}
                            </FormLabel>
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
                              errors.priority && touched.priority
                                ? "red.500"
                                : "gray.300"
                            }
                          >
                            {options.map((e, index) => {
                              return (
                                <option value={e.value} key={index} selected={e.value == de.priority ? de.priority : ""}>
                                  {e.label}
                                </option>
                              );
                            })}
                          </Field>
  
                          {errors.priority && touched.priority ? (
                            <FormLabel color={"red.600"}>
                              {errors.priority}
                            </FormLabel>
                          ) : (
                            ""
                          )}
                        </FormControl>
  
               
                       
                          <Button marginTop="5" colorScheme={"messenger"} type="submit" isLoading={loading}>
                            Save
                          </Button>
                 
                      </Form>
                    </Stack>
                  )}
                </Formik>
           
            
      </>
    );
  }
  
  export default Model;
  
  const CustomInputComponent = (props) => (
    <Input type={props.type} {...props} width={"full"} />
  );
  
  const customSelectorComponent = (props) => (
    <Select {...props} icon={"none"} height={"8rem"} required multiple />
  );
  const customSelectorComponent2 = (props) => (
    <Select {...props} placeholder="Select priority" />
  );
  