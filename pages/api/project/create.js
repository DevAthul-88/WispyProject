import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from 'mongoose'
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { title, description, members, priority, ordId } = req.body;
      const project = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        members,
        todo: new Array(),
        priority,
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
        { $push: { projects: project } }
      );

      res.send({ refresh: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  }
  else if(req.method === "PUT"){
    try{
      const { title, description, members, priority, ordId , project_id } = req.body;
       console.log(req.body);
    }catch(error){
      res.send({ error: error.message });
    }
  }
}
