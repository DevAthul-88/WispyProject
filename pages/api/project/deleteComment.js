import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from 'mongoose'
db();

const objectId = mongoose.Types.ObjectId

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, orgId, projectId } = req.body;

      await orgModel.updateOne(
        { _id: orgId, "projects._id": objectId(projectId)},
        { $pull: { "projects.$.comments": {id:id}} }
      );
      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
