import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';
import { Todo } from '../../classes/todo.js';

const router = express.Router(); 

const addTodo = (user, todo, callback) =>  {
    conn.query(`INSERT INTO TODOS (user_id, content, day, tags, startingTime, endingTime) values ("${user.id}", "${todo.content}", "${todo.day}", "${todo.tags}",  "${todo.startingTime}","${todo.endingTime}" )`, function(err,res){
        if (err) console.log(err); 
        console.log(res);
        return callback(res);
    })
}

router.post('/createTodo', authenticateToken, async (req, res) => {
    console.log(req.body.content) 
    addTodo(req.user, req.body, function(resultat){ 
        console.log(resultat)
    })
    console.log(req.user)
    res.send('Send from back createTodo')
})

export default router;