import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv'; 

dotenv.config();

export function generateRefreshToken(user){ 
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'1y'});
}