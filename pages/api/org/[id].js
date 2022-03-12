import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
db()

export default async function handler(req , res){
  if(req.method === "GET"){
      try {
          const userId = req.query.id;
          const data = await orgModel.findOne({"owner.id":userId})
          res.send({data: data});

      } catch (error) {
          res.send({error: error.message})
      }
  }
}