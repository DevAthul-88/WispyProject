import db from "../../utils/dbConnect";
import userSchema from '../../Schema/userSchema'
db();

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).send({ url: process.env.MONGO_DB_URL });
  } else if (req.method === "POST") {
    console.log(req.body);
  }
}
