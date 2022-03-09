import db from "../../../utils/dbConnect";
import userSchema from "../../../Schema/userSchema";
import bcrypt from "bcrypt";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, org, password } = req.body;
      const user = await userSchema.findOne({ email: email });

      if (user) {
        res.status(208).send({ error: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const User = new userSchema({
        username: username,
        email: email,
        org: org,
        password: hashedPassword,
      });

      User.save();

      res.status(201).send({
        message: "User successfully created, Please login to continue.",
      });
    } catch (error) {
      res.status(500).send({error: error.message});
    }
  }
}
