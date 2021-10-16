import mysql from 'mysql';

export const conn = mysql.createConnection({ 
    database: 'calendar', 
    host:'localhost', 
    user:'root', 
    password:'',
})

