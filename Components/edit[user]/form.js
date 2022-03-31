import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import EmpSchema from "../../Validation/emp_edit";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Components/Alert";
import { editEmp } from "../../redux/employee/action";
import { useRouter } from "next/router";

function Edit({ data, id }) {
  const router = useRouter();
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
      {set_emp_error && (
        <Alert trigger={true} type={"error"} description={set_emp_error} />
      )}
      <Flex>
        <Formik
          initialValues={{
            username: data.username,
            email: data.email,
            role: data.role,
            org: id,
            userId: router.query.slug,
          }}
          validationSchema={EmpSchema}
          onSubmit={(values) => {
            dispatch(editEmp(values));
          }}
        >
          {({ errors, touched }) => (
            <Stack spacing={4} w={"full"}>
              <Form>
                <FormControl marginTop={"5"}>
                  <FormLabel>Username</FormLabel>
                  <Field
                    name="username"
                    as={CustomInputComponent}
                    defaultValue={data.username}
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
                    defaultValue={data.email}
                    as={CustomInputComponent}
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
                  <FormLabel>Select role</FormLabel>
                  <Field
                    as={customSelectorComponent}
                    name={"role"}
                    defaultValue={data.role}
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

                <Button
                  marginTop={"5"}
                  colorScheme={"messenger"}
                  type="submit"
                  isLoading={set_emp_loading}
                >
                  Save
                </Button>
              </Form>
            </Stack>
          )}
        </Formik>
      </Flex>
    </>
  );
}

export default Edit;

const CustomInputComponent = (props) => (
  <Input type={props.type} {...props} width={"full"} />
);

const customSelectorComponent = (props) => (
  <Select {...props} placeholder="Select role" />
);
