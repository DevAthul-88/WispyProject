import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import { v4 as uuidv4 } from "uuid"

db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, orgId, username, projectId, comment } = req.body;
      const commentData = {
        userId: userId,
        username: username,
        comment: comment,
        id:uuidv4(),
        createdAt:Date.now()
      };

       await orgModel.updateOne({_id:orgId , "projects.id":projectId },{$push:{"projects.$.comments":commentData}});
       res.send({refresh: true})
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
