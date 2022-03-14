import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, org, emp_id, role, userId } = req.body;
      const checkAdmin = await orgModel.findOne({ "owner.email": email });
      if (checkAdmin)
        return res.send({
          error: "You can't use this credentials. Because it's admins",
        });
      const check = await orgModel.findOne(
        { "owner.id": userId },
        { employees: { email: email } }
      );

      if (check.employees.some((e) => e.email == email)) {
        res.send({ error: "Employee already exists." });
      } else {
        const hashedPassword = await bcrypt.hash(emp_id, 10);
        const employee = {
          _id: uuidv4(),
          username,
          email,
          org,
          role,
          password: hashedPassword,
          assignedProjects: [],
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
  }
}
