import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
db()

export default async function handler(req , res){
 if(req.method === "POST"){
     try {
         console.log(req.body);
     } catch (error) {
         res.send({error: error.message})
     }
 }
}
