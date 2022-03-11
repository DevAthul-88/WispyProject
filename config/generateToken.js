import jwt from 'jsonwebtoken';

const generateToken = (credentials) => {
const token = jwt.sign(process.env.TOKEN , credentials , {expiresIn:"30d"})
return token;
}
export default generateToken;