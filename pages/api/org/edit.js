import db from "../../../utils/dbConnect";
import userModel from "../../../Schema/userSchema";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await userModel.findByIdAndUpdate(
        { _id: objectId(req.body.userId) },
        {
          $set: {
            userName: req.body.username,
            email: req.body.email,
          },
        }
      );
      const User = await userModel.findById({ _id: objectId(req.body.userId) });
      const userCredentials = {
        _id: User._id,
        username: User.userName,
        email: User.email,
        org: User.organization,
        role: User.role,
        createdAt: User.createdAt,
        updatedAt: User.updatedAt,
      };
      console.log(User);
      res.send({ success: true, user: userCredentials });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
