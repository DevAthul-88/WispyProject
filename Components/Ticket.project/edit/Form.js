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
import TicketSchema from "../../../Validation/ticket.create";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../Components/Alert";
import { editTicket } from "../../../redux/ticket/action";
import { useEffect } from "react";

function Model({ data, de , org }) {
  const dispatch = useDispatch();
  const { edit_loading, edit_error, edit_reload } = useSelector((state) => state.ticket);
  const options = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
    { value: "none", label: "None" },
  ];

  const options2 = [
    { value: "issue", label: "Issue" },
    { value: "bug", label: "Bug" },
    { value: "error", label: "Error" },
    { value: "high", label: "High" },
    { value: "feature_request", label: "Feature Request" },
    { value: "other", label: "Other" },
  ];

  const options3 = [
    { value: "new", label: "New" },
    { value: "open", label: "Open" },
    { value: "in_progress", label: "In progress" },
    { value: "resolve", label: "Resolve" },
  ];

  const members = data.map((e) => {
    return {
      value: e._id,
      label: e.username,
    };
  });
  const projects = org.projects.map((e) => {
    return {
      value: e._id,
      label: e.title,
    };
  });


  return (
    <>
      <Formik
        initialValues={{
          title: de.title,
          description: de.description,
          members: de.members,
          project: de.project,
          priority:de.priority,
          type: de.type,
          status: de.status,
          ordId: org._id,
          ticket:de._id,
        }}
        validationSchema={TicketSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(editTicket(values));
          if (!edit_error) {
            resetForm();
          }
        }}
      >
        {({ errors, touched }) => (
          <Stack spacing={4} w={"full"} >
            <Form>
              <FormControl marginTop={"5"}>
                <FormLabel>Ticket title</FormLabel>
                <Field
                  name="title"
                  as={CustomInputComponent}
                  type={"text"}
                  defaultValue={de.title}
                  focusBorderColor={"messenger.500"}
                  borderColor={
                    errors.title && touched.title ? "red.500" : "gray.300"
                  }
                />
                {errors.title && touched.title ? (
                  <FormLabel color={"red.600"}>{errors.title}</FormLabel>
                ) : (
                  ""
                )}
              </FormControl>

              <FormControl id="email" marginTop={"5"}>
                <FormLabel>Ticket description</FormLabel>
                <Field
                  name="description"
                  as={CustomInputComponent}
                  defaultValue={de.description}
                  focusBorderColor={"messenger.500"}
                  borderColor={
                    errors.description && touched.description
                      ? "red.500"
                      : "gray.300"
                  }
                />
                {errors.description && touched.description ? (
                  <FormLabel color={"red.600"}>{errors.description}</FormLabel>
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
                    errors.members && touched.members ? "red.500" : "gray.300"
                  }
                >
                  {members.map((e, index) => {
                    return (
                      <option value={e.value} key={index} selected={de.members}>
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
                <FormLabel>Select project</FormLabel>
                <Field
                  as={customSelectorComponent5}
                  name={"project"}
                  borderColor={
                    errors.project && touched.project ? "red.500" : "gray.300"
                  }
                >
                  {projects.map((e, index) => {
                    return (
                      <option value={e.value} key={index} selected={de.project}>
                        {e.label}
                      </option>
                    );
                  })}
                </Field>

                {errors.project && touched.project ? (
                  <FormLabel color={"red.600"}>{errors.project}</FormLabel>
                ) : (
                  ""
                )}
              </FormControl>
              <Flex>
                <FormControl marginTop={"5"}>
                  <FormLabel>Select type</FormLabel>
                  <Field
                    as={customSelectorComponent3}
                    name={"type"}
                    borderColor={
                      errors.type && touched.type ? "red.500" : "gray.300"
                    }
                  >
                    {options2.map((e, index) => {
                      return (
                        <option value={e.value} key={index} selected={de.type}>
                          {e.label}
                        </option>
                      );
                    })}
                  </Field>

                  {errors.type && touched.type ? (
                    <FormLabel color={"red.600"}>{errors.type}</FormLabel>
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
                        <option value={e.value} key={index} selected={de.priority}>
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

                <FormControl marginTop={"5"}>
                  <FormLabel>Select status</FormLabel>
                  <Field
                    as={customSelectorComponent4}
                    name={"status"}
                    borderColor={
                      errors.status && touched.status ? "red.500" : "gray.300"
                    }
                  >
                    {options3.map((e, index) => {
                      return (
                        <option value={e.value} key={index} selected={de.status}>
                          {e.label}
                        </option>
                      );
                    })}
                  </Field>

                  {errors.status && touched.status ? (
                    <FormLabel color={"red.600"}>{errors.status}</FormLabel>
                  ) : (
                    ""
                  )}
                </FormControl>
              </Flex>

 
               
                <Button
                marginTop={"5"}
                  colorScheme={"messenger"}
                  type="submit"
                  isLoading={edit_loading}
                >
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
const customSelectorComponent3 = (props) => (
  <Select {...props} placeholder="Select type" />
);
const customSelectorComponent4 = (props) => (
  <Select {...props} placeholder="Select status" />
);
const customSelectorComponent5 = (props) => (
  <Select {...props} placeholder="Select project" />
);
