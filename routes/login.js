import express from 'express';
import {conn} from '../config/database.js';
import { User } from '../classes/user.js';
import { generateAccessToken } from '../config/jwToken.js';
import { generateRefreshToken } from '../config/RefreshJwToken.js';
import { authenticateToken } from '../middleware/authenticateToken.js';

const router = express.Router(); 
let accessToken, refreshToken;

let sql_check_credentials = (username, pass) => { 
    return `SELECT id from user where username="${username}" AND userpass="${pass}"`
};

const Login = (username, pass, callback) =>  {
    conn.query(sql_check_credentials(username, pass), function(err, res, field){
        if (res.length === 1){
            let user = new User(username, pass); 
            user.id.then((id) =>{ 
                console.log(id)
                accessToken = generateAccessToken({...user, id})
                refreshToken = generateRefreshToken({...user, id})
                return callback(200, {accessToken, refreshToken, username, id})
            })
        }
        else {
            return callback(401, null)
        }
    })
}

router.post('/login', (req, res) => {
    Login(req.body.username, req.body.pass, (res_status, user_infos = null) => {
        console.log(res_status)
        if (res_status === 200){
            res.send(user_infos)
        }
        else{
            res.send(res_status);
        }
})
})

export default router;