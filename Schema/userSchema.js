import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

const userModel = mongoose.model("user", userSchema);

export default userModel;
