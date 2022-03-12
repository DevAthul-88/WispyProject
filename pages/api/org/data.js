import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
db()

export default async function handler(req , res){
  if(req.method === "GET"){
      try {
          const {id} = req.params;
          const data = await orgModel.findOne({"owner._id":id})
          res.send({data: data});

      } catch (error) {
          res.send({error: error.message})
      }
  }
}