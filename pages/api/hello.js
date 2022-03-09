import db from "../../utils/dbConnect";
import userSchema from '../../Schema/userSchema'
db();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const user = await userSchema.find().count()
    res.status(200).send({ totalUsers: user});
  } else if (req.method === "POST") {
    console.log(req.body);
  }
}
