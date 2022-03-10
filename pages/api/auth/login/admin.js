import db from "../../../../utils/dbConnect";
import userModel from "../../../../Schema/userSchema";
import bcrypt from "bcrypt";
db();

export default async function handler(req, res){
    if(req.method === "POST"){
        console.log(req.body);
    }
}