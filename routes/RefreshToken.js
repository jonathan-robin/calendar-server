import express from 'express';
import jwt from 'jsonwebtoken';
import { conn } from '../config/database.js';
import { generateAccessToken } from '../config/jwToken.js';

const router = express.Router(); 

router.post('/RefreshToken', (req,res) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){ 
            console.log(err)
            return res.sendStatus(401);
        }
        let sql_check_user = `SELECT * from user where username="${user.username}" AND id=${user.id}`; 
        conn.query(sql_check_user, (err, response)=>{
            if (response.length > 0){
                delete user.iat; 
                delete user.exp; 
                const refreshedToken = generateAccessToken(user); 
                return res.send({
                    accessToken: refreshedToken,
                });
            }
            else if(err){ 
                console.log(err)
            }
        })

    })
})

export default router;