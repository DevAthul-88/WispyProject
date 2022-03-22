import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, orgId, username, projectId, comment } = req.body;
      const commentData = {
        userId: userId,
        username: username,
        comment: comment,
        id: uuidv4(),
        createdAt: Date.now(),
      };

     let p = await orgModel.updateOne(
        { _id: orgId, "projects._id": objectId(projectId) },
        { $push: { "projects.$.comments": commentData } }
      );
      console.log(p);
      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
