import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      const { orgId, projectId } = req.body;

      await orgModel.findByIdAndUpdate(
        {
          _id: orgId,
        },
        {
          $set: {
            "projects.$[i].completed.approved": true,
          },
        },
        {
          arrayFilters: [{ "i._id": objectId(projectId) }],
        }
      );
      res.send({ success: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
  else if(req.method === "PATCH") {
    try {
      console.log(req.body);
      const { orgId, projectId } = req.body;

      await orgModel.findByIdAndUpdate(
        {
          _id: orgId,
        },
        { $pull: { "projects":{_id:objectId(projectId)}} }
      )
      res.send({ success: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
