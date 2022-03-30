import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";

db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        url,
        ticketId,
        filename,
        ordId,
        fileSize,
      } = req.body;
      const ticket = {
        _id: new mongoose.Types.ObjectId(),
        url:url,
        filename:filename,
        fileSize:fileSize,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      await orgModel.updateOne(
        { _id: ordId, "tickets._id": objectId(ticketId) },
        { $push: { "tickets.$.attachments": ticket } }
      );

      res.send({ refresh: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  } 
  
}
