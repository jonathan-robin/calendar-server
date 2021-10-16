import createAccount from './routes/createAccount.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

// const jwt = require('jsonwebtoken'); 
// const express = require('express'); 
dotenv.config(); 
const app = express(); 

console.log(process.env.ACCESS_TOKEN_SECRET)

app.use(express.json()); 
app.use(express.urlencoded({ extended : true }))

app.use('/api/', createAccount);

app.listen('5000', () => {console.log('listening on port 5000')})

const user ={
    id:1, 
    name:'Jean Moulin', 
    password:'azer',

}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'}) 
}

const accessToken = generateAccessToken(user)
console.log('accessToken', accessToken)
// const user = 

