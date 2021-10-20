import createAccount from './routes/createAccount.js';
import Login from './routes/login.js';
import home from './routes/home.js';
import RefreshToken from './routes/RefreshToken.js';
import createTodo from './routes/todos/createTodo.js';
import addTag from './routes/todos/addTag.js';
import tags from './routes/todos/tags.js';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

// const jwt = require('jsonwebtoken'); 
// const express = require('express'); 
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

app.listen('5000', () => {console.log('listening on port 5000')})

// const user ={
//     id:1, 
//     name:'Jean Moulin', 
//     password:'azer',

// }




// const user = 

