import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, orgId, projectId } = req.body;

      await orgModel.updateOne(
        { _id: orgId, "projects._id": projectId },
        { $pull: { "projects.$.comments": {id:id}} }
      );
      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
