require('dotenv').config();

const env=process.env.ENV



// database config 
const db_name=env==='dev'?'bgmi':process.env.DB_DBNAME
const db_host=env==='dev'?'localhost':process.env.DB_HOST
const db_pwd=env==='dev'?'':process.env.DB_PWD
const db_username=env==='dev'?'root':process.env.DB_USERNAME





// exports 
module.exports={db_host,db_name,db_pwd,db_username}