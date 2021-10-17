import { conn } from "../config/database.js"

export class User{
    
    constructor(username, pass){
        this.username = username;
        this.pass = pass;
        this.id = this.getId();
    }
    
    async getId(){ 
        const p = await new Promise((resolve, reject) => { 
            conn.query(`SELECT * FROM USER WHERE userName = "${this.username}" AND userPass = "${this.pass}"`, function(err, res, field){ 
                resolve(res[0].id);
            })
        })
        return p
    }
}