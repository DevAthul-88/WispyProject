import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
db();

const objectId = mongoose.Types.ObjectId;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, org, emp_id, role, userId } = req.body;
      const check = await orgModel.findOne({ "owner.id": userId });

      if (check.employees.some((e) => e.email == email)) {
        res.send({ error: "Employee already exists." });
      } else {
        const hashedPassword = await bcrypt.hash(emp_id, 10);
        const employee = {
          _id: new mongoose.Types.ObjectId(),
          username,
          email,
          org,
          role,
          password: hashedPassword,
          createdAt: Date.now(),
        };
        await orgModel.updateOne(
          { "owner.id": userId },
          { $push: { employees: employee } }
        );

        res.send({ refresh: true });
      }
    } catch (error) {
      res.send({ error: error.message });
    }
  } else if (req.method === "PATCH") {
    try {
      const { username, email, org, role, userId } = req.body;
      console.log(userId);
      await orgModel.findByIdAndUpdate(
        { _id: org },
        {
          $set: {
            "employees.$[i].username": username,
            "employees.$[i].email": email,
            "employees.$[i].role": role,
          },
        },
        {
          arrayFilters: [{ "i._id": objectId(userId) }],
        }
      );

      res.send({ refresh: true });
    } catch (error) {
      res.send({ error: error.message });
    }
  }
}
