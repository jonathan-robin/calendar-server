import createAccount from './routes/createAccount.js';
import Login from './routes/login.js';
import home from './routes/home.js';
import RefreshToken from './routes/RefreshToken.js';
import createTodo from './routes/todos/createTodo.js';
import addTag from './routes/tags/addTag.js';
import tags from './routes/tags/tags.js';
import getTodos from './routes/todos/getTodos.js';
import getTodo from './routes/todos/getTodo.js';
import deleteTodo from './routes/todos/deleteTodo.js';
import archiveTodo from './routes/todos/archiveTodo.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config(); 
const app = express(); 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended : true }))

app.use('/api/', createAccount);
app.use('/api/', Login);
app.use('/api/', RefreshToken);
app.use('/api/', home);
app.use('/api/', createTodo);
app.use('/api/', addTag);
app.use('/api/', tags);
app.use('/api/', getTodos)
app.use('/api/', getTodo)
app.use('/api/', deleteTodo)
app.use('/api/', archiveTodo)

app.listen('5000', () => {console.log('listening on port 5000')})

// const user ={
//     id:1, 
//     name:'Jean Moulin', 
//     password:'azer',

// }




// const user = 

