import * as Yup from "yup";

const EditSchema = Yup.object().shape({
    username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email address is required"),
});
export default EditSchema;