import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
        const { orgId ,  emp } = req.body;
        await orgModel.findByIdAndUpdate(
          { _id: objectId(orgId) },
          {
             $pull:{"employees.$._id":objectId(emp)}
          },
          
        );
        res.send({ success: true });
      
    } catch (error) {
      res.send({ error: error.message });
    }
  } 
}
