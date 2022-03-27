import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";

db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        console.log(req.body);
      const { title  , description , members , project , priority , type , status , ordId } = req.body;
      const ticket = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        members,
        priority,
        type:type,
        status:status,
        project:project,
        tickets:[],
        completed: {
          flagged: false,
          approved: false,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
        comments: new Array(),
      };

      await orgModel.updateOne(
        { _id: ordId },
        { $push: { tickets: ticket} }
      );

      res.send({ refresh: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { title, description, members, priority, ordId, project_id } =
        req.body;

      await orgModel.findByIdAndUpdate(
        {
          _id: ordId,
        },
        {
          $set: {
            "projects.$[i].title": title,
            "projects.$[i].description": description,
            "projects.$[i].members": members,
            "projects.$[i].priority": priority,
          },
        },
        {
          arrayFilters: [{ "i._id": objectId(project_id) }],
        }
      );
      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const { orgId, projectId } = req.body;

      await orgModel.findByIdAndUpdate(
        {
          _id: orgId,
        },
        {
          $set: {
            "projects.$[i].completed.flagged": true,
          },
        },
        {
          arrayFilters: [{ "i._id": objectId(projectId) }],
        }
      );
      res.send({ reload: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
