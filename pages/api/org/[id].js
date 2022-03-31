import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
db()

export default async function handler(req , res){
  if(req.method === "GET"){
      try {
          const name = req.query.id;
          const data = await orgModel.findOne({"name":name}).select("-employees.password")
          res.send({data: data});

      } catch (error) {
          res.send({error: error.message})
      }
  }
}