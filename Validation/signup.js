import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  org: Yup.string().email("Invalid org").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Password required"),
});
export default SignupSchema;
