import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";

db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        title,
        description,
        members,
        project,
        priority,
        type,
        status,
        ordId,
      } = req.body;
      const ticket = {
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        members,
        priority,
        type: type,
        status: status,
        project: project,
        tickets: [],
        completed: {
          flagged: false,
          approved: false,
        },
        createdAt: Date.now(),
        updatedAt: Date.now(),
        comments: new Array(),
      };

      await orgModel.updateOne({ _id: ordId }, { $push: { tickets: ticket } });

      res.send({ refresh: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  } 
  
}
