import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const todoModal = {
          id:uuidv4(),
          title: req.body.title,
          description: req.body.description,
          user: req.body.userId,
          orgId: req.body.orgId,
          isCompleted: req.body.isCompleted,
          projectId: req.body.projectId
      }
      await orgModel.updateOne({_id:req.body.orgId , "project.id":req.body.projectId} , {
        $push:{todo:todoModal}
      })
      res.send({success: true})
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
