import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
  org: Yup.string().required("Organization name is required"),
  email: Yup.string().email("Invalid email").required("Email address is required"),
  password: Yup.string().min(2, "Too Short!").max(16 , "Too Long!").required("Password required"),
});
export default SignupSchema;
