import * as Yup from "yup";

const EmployeeSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  org: Yup.string().required("Organization name is required"),
  role: Yup.string().required("Employee role is required"),
  email: Yup.string().email("Invalid email").required("Email address is required"),
  emp_id: Yup.string().min(2, "Too Short!").max(16 , "Too Long!").required("Staff id is required"),
});
export default EmployeeSchema;
