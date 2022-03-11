import db from "../../../utils/dbConnect";
import userModel from "../../../Schema/userSchema";
import orgModel from "../../../Schema/orgSchema";
import bcrypt from "bcrypt";

db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, org, password } = req.body;
      const cred = await userModel.findOne({ email: email });

      if (cred) {
        res.status(208).send({ error: "User already exists." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const User = new userModel({
        userName: username,
        email: email,
        organization: org,
        password: hashedPassword,
      });

      const Org = new orgModel({
        name: org,
      });

      User.save((err) => {
        if (err) return console.log(err);
      });

      Org.save((err) => {
        if (err) return console.log(err);
      });
      res.status(201).send({
        message: "User successfully created, Please login to continue.",
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
