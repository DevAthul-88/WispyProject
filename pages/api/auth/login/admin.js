import db from "../../../../utils/dbConnect";
import userModel from "../../../../Schema/userSchema";
import bcrypt from "bcrypt";
db();

export default async function handler(req, res){
    if(req.method === "POST"){
        const {  email, org, password } = req.body;
        const User = await userModel.findOne({email:email})
        if(!User) return res.send({error: "User not found"})

        if(org !== User.organization) return res.send({error: "Invalid organization"})

        const passwords = await bcrypt.compare(password , User.password)

        if(!passwords) return res.send({error: "Invalid password"})
        res.send({message: "User found"})
    }
}