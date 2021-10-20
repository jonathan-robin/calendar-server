import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';
import { Todo } from '../../classes/todo.js';

const router = express.Router(); 

const getTodos = (user, callback) =>  {
    conn.query(`SELECT * from todos where user_id = ${user.id}`, function(err, res){ 
        if (err) console.log(err); 
        console.log(res); 
        return callback(res)
    })
}

router.get('/getTodo', authenticateToken, async (req, res) => {
    getTodos(req.user, function(resultat){ 
        res.send(resultat)
    })
})

export default router;