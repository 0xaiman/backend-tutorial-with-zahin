import pg from 'pg'
import createUserTable from '../model/user.js';
import createTodosTable from '../model/todo.js';

const { Pool } = pg
 
export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password:process.env.PGPASSWORD,
  database:process.env.PGDATABASE,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function testConnect(){
    //use try catch for db connection eror handling
    try{
        const dbCurrent = await pool.query("SELECT current_database() ");
        // console.log(dbCurrent);
        const dbName = dbCurrent.rows[0].current_database;
        const dbRes = await pool.query("SELECT NOW()");
        const time = dbRes.rows[0].now;
        console.log(`connection to DB :"${dbName}" is OK at time "${time}"`);

        //create User table
        createUserTable();
        createTodosTable();
        


    }catch(error){
        console.log("DB CONNECTION FAILS");
        console.log("ERROR",error);

    }
}