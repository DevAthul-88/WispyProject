import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      console.log(req.body);
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
