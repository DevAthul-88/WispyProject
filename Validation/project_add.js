import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
  members: Yup.array().required("Members is required"),
  priority: Yup.string().required("Priority level is required"),
});
export default SignupSchema;