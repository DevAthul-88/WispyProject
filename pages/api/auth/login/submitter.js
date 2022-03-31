import db from "../../../../utils/dbConnect";
import orgModel from "../../../../Schema/orgSchema";
import generateToken from "../../../../config/generateToken";
import bcrypt from "bcrypt";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    const org = await orgModel.findOne({ name: req.body.org });

    if (!org) return res.send({ error: "No organization found" });

    if (org) {
      console.log(org);
      const User = org.employees.find((e) => e.email === req.body.email);
      if (!User) return res.send({ error: "No user found" });

      const passwords = await bcrypt.compare(req.body.password, User.password);

      if (!passwords) return res.send({ error: "Invalid password" });

      const credentials = {
        email: User.email,
        id: User._id,
      };

      const userCredentials = {
        _id: User._id,
        username: User.username,
        email: User.email,
        org: User.org,
        role: User.role,
        createdAt: User.createdAt,
      };

      const token = await generateToken(credentials);

      res.send({ token: token, userInfo: userCredentials });
    }
  }
}
