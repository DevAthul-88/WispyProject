import * as Yup from "yup";

const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Title is required"),
  description: Yup.string().required("Description is required"),
});
export default TodoSchema;