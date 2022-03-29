import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from 'mongoose'
import { v4 as uuidv4 } from "uuid";
db();

const objectId = mongoose.Types.ObjectId

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, orgId, projectId } = req.body;

      await orgModel.updateOne(
        { _id: orgId, "tickets._id": objectId(projectId)},
        { $pull: { "tickets.$.comments": {id:id}} }
      );
      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
