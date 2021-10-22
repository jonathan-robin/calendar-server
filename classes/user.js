import { conn } from "../config/database.js"

export class User{
    #pass; 
    constructor(username, pass){
        this.username = username;
        this.#pass = pass;
        this.id = this.getId();
    }
    
    async getId(){ 
        let create_user;
        if (this.pass){ create_user = ` AND userPass = "${this.pass}"`}
        else{ create_user = ''; }
        const p = await new Promise((resolve, reject) => { 
            conn.query(`SELECT * FROM USER WHERE userName = "${this.username}"${create_user}`, function(err, res, field){ 
                resolve(res[0].id);
            })
        })
        return p
}
}