import express from 'express';
import jwt from 'jsonwebtoken';
import { conn } from '../config/database.js';
import { generateAccessToken } from '../config/jwToken.js';

const router = express.Router(); 

router.post('/RefreshToken', (req,res) => {
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1]; 
    console.log('refresh token', token)
    if (!token){
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err){ 
            console.log('err VERIFY REFRESH TOKEN SECRET', token)
            console.log(err)
            return res.sendStatus(401);
        }
        let sql_check_user = `SELECT * from user where username="${user.username}" AND id=${user.id}`; 
        conn.query(sql_check_user, (err, response)=>{
            console.log('enter sql_check_user', user)
            if (response.length > 0){
                console.log('enter user still exist', user)
                delete user.iat; 
                delete user.exp; 
                const refreshedToken = generateAccessToken(user); 
                return res.send({
                    accessToken: refreshedToken,
                });
            }
            else if(err){ 
                console.log(err)
                return res.sendStatus(401);
            }
        })

    })
})

export default router;