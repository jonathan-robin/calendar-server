import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';
import { Todo } from '../../classes/todo.js';

const router = express.Router(); 

const getTodo = (user, todo_id, callback) =>  {
    conn.query(`SELECT * from todos where user_id = ${user.id} AND todo_id = ${todo_id}`, function(err, res){ 
        if (err) console.log(err); 
        console.log(res); 
        return callback(res)
    })
}

router.post('/getTodo', authenticateToken, async (req, res) => {
    getTodo(req.user, req.body.todo_id, function(resultat){ 
        res.send(resultat)
    })
})

export default router;