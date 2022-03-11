import jwt from "jsonwebtoken";

const generateToken = (credentials) => {
  const token = jwt.sign(credentials, process.env.TOKEN, { expiresIn: "30d" });
  return token;
};
export default generateToken;
