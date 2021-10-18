import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticateToken(req, res, next) { 
    console.log(req.headers['authorization'])
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 

    console.log('token auth', token); 
    console.log('authHeader', authHeader); 

    if (!token){
        return res.status(401)
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { 
            console.log('err')
            return res.status(401).send(''); 
        }
        req.user = user; 
        next(); 
    })
}