import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    try {
      console.log(req.body);
 
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
