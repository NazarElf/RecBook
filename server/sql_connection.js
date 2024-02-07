import * as mysql from 'mysql';

export const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "crud_user",
    port:3306,
    password: "StrongRecBook74_Pass",
    database: "recbook"
})

//crud_user@127.0.0.1:3306