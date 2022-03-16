import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import userModal  from "../../../Schema/userSchema"
import { v4 as uuidv4 } from "uuid";
db()

export default async function handler(req , res){
    
  if(req.method === "POST"){
   
      try {
          const {title , description , members , priority  , ordId} = req.body;
         const project  =  {
              id:uuidv4(),
              title,
              description,
              members,
              todo:new Array(),
              priority,
              completed:{
                  flagged:false,
                  approved:false
              },
              createdAt:Date.now(),
              updatedAt:Date.now(),
              comments:new Array()
          }
        

        
          await orgModel.updateOne({_id:ordId} ,{$push:{"projects":project}})
        // const member = await orgModel.updateOne({'employees.id':{$ne:members} } , {$push:{"assignedProjects":project.id}})
        //  console.log(member);
        res.send({ refresh:true})
      } catch (error) {
          console.log(error.message);
          res.send({error: error.message})
      }
  }
}