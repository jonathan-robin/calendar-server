import express from 'express';
import { authenticateToken } from '../../middleware/authenticateToken.js';
import {conn} from '../../config/database.js';

const router = express.Router(); 

const addTodo = (user, todo, callback) =>  {
    conn.query(`Update TODOS set archived = true WHERE todo_id = ${todo} AND user_id = ${user.id}`, function(err,res){
        if (err) console.log(err); 
        console.log(res);
        return callback(res);
    })
}

router.post('/archiveTodo', authenticateToken, async (req, res) => {
    console.log(req.body.content) 
    addTodo(req.user, req.body.id, function(resultat){ 
        console.log(resultat)
    })
    console.log(req.user)
    res.send('Send from back createTodo')
})

export default router;