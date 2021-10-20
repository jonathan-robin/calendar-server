import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';
import { Todo } from '../../classes/todo.js';

const router = express.Router(); 

const deleteTodo = (user, todo, callback) =>  {
    conn.query(`DELETE FROM TODOS WHERE user_id = ${user.id} AND todo_id = ${todo}`, function(err, res){ 
        if(err) console.log(err); 
        console.log(res); 
        return callback(res);
    })
}

router.post('/deleteTodo', authenticateToken, async (req, res) => {
    console.log(req.body.todo_id);
    deleteTodo(req.user, req.body.todo_id, function(resultat){ 
        console.log(resultat)
    })
    res.send('Send from back createTodo')
})

export default router;