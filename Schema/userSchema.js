import mongoose from "mongoose";

const userSchemas = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "ADMIN",
      required: true,
    },
    organization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.models.Users ||  mongoose.model("Users", userSchemas);

export default userModel;
