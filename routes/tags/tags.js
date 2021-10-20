import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';

const router = express.Router(); 

const getTags = (user, callback) =>  {
    conn.query(`SELECT * from tags where userid = ${user.id} OR userid = 0`, function(err,res){
        if (err) console.log(err); 
        return callback(res);
    })
}

router.post('/tags', authenticateToken, async (req, res) => {
    console.log("enter /tags")
    console.log(req.user)
    getTags(req.user, function(resultat){ 
        console.log(resultat)
        return res.send(resultat)
        // console.log(resultat)
    })
    // console.log(req.user)
    // res.send('Send from tags')
})

export default router;