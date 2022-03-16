import db from "../../../utils/dbConnect";
import orgModel from "../../../Schema/orgSchema";
db();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, orgId, username, projectId, comment } = req.body;
      const commentData = {
        userId: userId,
        username: username,
        comment: comment,
      };
      console.log(req.body);
      const data =  await orgModel.updateOne({_id:orgId , "projects.id":projectId },{$push:{"projects.$.comments":commentData}});
      console.log(data);
      res.send({ refresh: true });
    } catch (error) {
      console.log(error.message);
      res.send({ error: error.message });
    }
  }
}
