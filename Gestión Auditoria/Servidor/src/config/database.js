require('dotenv').config();

import sql from 'mssql';

const configDB  =  {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DB_NAME,
    server : process.env.SERVER_NAME,
    port :  parseInt(process.env.PORT_DATABASE),
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}; 


// Version 1
export async function connection(){
    try{
        console.log('Conexion exitosa');
        return await sql.connect(configDB);
    }catch(err){
        console.log('Error: '+err);
    }
}

export { sql };

// Version 2
/*
async function getConection(){
    await sql.connect(configDB, (err) =>{
        return(err) ? console.log('Error: Conexion con BD Fallida: '+err ) : console.log('Conexion con BD exitosa!')
    })
}
*/
//getConection();

