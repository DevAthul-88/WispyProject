import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
import { v4 as uuidv4 } from "uuid";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const todoModal = {
          id:uuidv4(),
          title: req.body.title,
          description: req.body.description,
          user: req.body.userId,
          orgId: req.body.orgId,
          isCompleted: req.body.isCompleted,
          projectId: req.body.projectId
      }
      await orgModel.updateOne({_id:req.body.orgId , "projects.id":req.body.projectId} , {
        $push:{"projects.$.todo":todoModal}
      })
      res.send({success: true})
    } catch (error) {
      res.send({ error: error.message });
    }
    
  }
  else if(req.method === "GET"){
    try {
      const todo = await orgModel.findOne({_id:req.query.orgId , "projects.id":req.query.query})
      res.send({success: true , data: todo})
    } catch (error) {
      res.send({ error: error.message });
    }
  }
  else if(req.method === "DELETE"){
    try {
      await orgModel.updateOne({_id:req.query.orgId , "projects.id":req.query.query} , {
        $pull:{"projects.$.todo":{id:req.query.todo}}
      })
      res.send({reload:true})
    } catch (error) {
      res.send({ error: error.message });
    }
  }
  else if(req.method === "PATCH"){
    try {
      await orgModel.updateOne({_id:req.query.orgId , "projects.id":req.query.query} , {
        $set:{"projects.$.todo.0.isCompleted":true}
      })
      res.send({reload:true})
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  }
}
