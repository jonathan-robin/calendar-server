// const express = require('express');
import express from 'express';
import {conn} from '../config/database.js';

const router = express.Router(); 

const createAccount = (sql, username, pass, callback) =>  {
    let sql_insert = `INSERT INTO USER (userName, userPass) values ("${username}", "${pass}")`
    conn.query(sql, function(err, res){ 

        if (res.length === 0) { 
            if (res.length === 0){
                conn.query(sql_insert, (err, res) => {
                    if(err){ console.log(err);return callback(501) }
                    return callback(200);
                })
            }
        }
        else{
            console.log(res);
            return callback(401)
        }
    })
}

router.post('/createAccount', async (req, res) => {
    let sql = `SELECT id from user where username="${req.body.username}"`;

    createAccount(sql, req.body.username, req.body.pass, (resultat) => {
        if (resultat === 401){ 
            console.log("Nom d'utilisateur déjà utilisé...");
            res.sendStatus(401)
        }
        else if( resultat === 501){
            console.log('Erreur lors de la création du compte...');
            res.sendStatus(501)
        }
        else{
            console.log('Compte crée avec succès !')
            res.sendStatus(200)
        }
})
})

export default router;