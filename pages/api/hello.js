// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if(req.method === "GET"){
    res.status(200).send({user:"user"})
  }
  else if(req.method === "POST"){
    console.log(req.body);
  }
}
