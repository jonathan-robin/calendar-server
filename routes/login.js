import express from 'express';
import {conn} from '../config/database.js';
import { User } from '../classes/user.js';
import { generateAccessToken } from '../config/jwToken.js';
import { generateRefreshToken } from '../config/RefreshJwToken.js';

const router = express.Router(); 
let accessToken, refreshToken;

let sql_check_credentials = (username, pass) => { 
    return `SELECT id from user where username="${username}" AND userpass="${pass}"`
};

const Login = (username, pass, callback) =>  {
    conn.query(sql_check_credentials(username, pass),  async function(err, res, field){
        if (res.length === 1){
            let user = new User(username, pass); 
            await user.id.then((res) =>{ 
                accessToken = generateAccessToken({...user, id:res})
                refreshToken = generateRefreshToken({...user, id:res})
            })
            return callback(200, {accessToken, refreshToken})
        }
        else {
            return callback(401, null)
        }
    })
}

router.post('/login', async (req, res) => {
    Login(req.body.username, req.body.pass, (res_status, token = null) => {
        if (res_status === 200){
            console.log('send token valid cred')
            res.send(token)
        }
        else{
            console.log('send invalid cred')
            console.log(res_status)
            res.send(res_status);
        }
})
})

export default router;