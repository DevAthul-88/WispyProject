import db from "../../../utils/dbConnect";
import mongoose from "mongoose";
import orgModel from "../../../Schema/orgSchema";
db();

const objectId = mongoose.Types.ObjectId

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const todoModal = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        user: req.body.userId,
        orgId: req.body.orgId,
        isCompleted: req.body.isCompleted,
        projectId: req.body.projectId,
      };
     const d = await orgModel.updateOne(
        { _id: req.body.orgId, "projects._id": objectId(req.body.projectId)},
        {
          $push: { "projects.$.todo": todoModal },
        }
      );
      res.send({ success: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const todo = await orgModel.findOne({
        _id: req.query.orgId,
        "projects._id":objectId(req.query.query),
      });
      res.send({ success: true, data: todo });
    } catch (error) {
      res.send({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await orgModel.updateOne(
        { _id: req.query.orgId, "projects._id": req.query.query },
        {
          $pull: { "projects.$.todo": { _id: req.query.todo } },
        }
      );
      res.send({ reload: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const s = await orgModel.updateOne(
        {
          _id: req.query.orgId,
          "projects._id": req.query.query,
        },
        { $set: { "projects.$[i].todo.$[elem].isCompleted": true } },
        {
          arrayFilters: [
            { "i._id": req.query.query },
            { "elem._id": req.query.todo },
          ],
        }
      );
      console.log(s);
      res.send({ reload: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  }
}
