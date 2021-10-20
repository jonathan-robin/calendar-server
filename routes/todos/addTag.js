import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';
import { Todo } from '../../classes/todo.js';

const router = express.Router(); 

const addTag = (user, tag, callback) =>  {
    conn.query(`INSERT INTO tags (name, userid) values ("${tag}", "${user.id}")`, function(err,res){
        if (err) console.log(err); 
        console.log(res);
        return callback(res);
    })
}

router.post('/addTag', authenticateToken, async (req, res) => {
    addTag(req.user, req.body.tag, function(resultat){ 
        console.log(resultat)
    })
    console.log(req.user)
    res.send('Send from back addTag')
})

export default router;