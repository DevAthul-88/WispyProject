import db from "../../../../utils/dbConnect";
import userModel from "../../../../Schema/userSchema";
import generateToken from "../../../../config/generateToken";
import bcrypt from "bcrypt";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, org, password } = req.body;
    const User = await userModel.findOne({ email: email });
    if (!User) return res.send({ error: "User not found" });

    if (org !== User.organization)
      return res.send({ error: "Invalid organization" });

    const passwords = await bcrypt.compare(password, User.password);

    if (!passwords) return res.send({ error: "Invalid password" });

    const credentials = {
      email: User.email,
      id: User._id,
    };

    const userCredentials = {
      _id: User._id,
      username: User.username,
      email: User.email,
      org: User.organization,
      role: User.role,
      createdAt: User.createdAt,
      updatedAt: User.updatedAt,
    };

    const token = await generateToken(credentials);

    res.send({token: token , userInfo:userCredentials});
  }
}
