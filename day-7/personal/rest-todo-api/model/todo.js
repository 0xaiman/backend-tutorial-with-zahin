import { pool } from "../database/connection.js";

const query = `
CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id),
    status BOOLEAN DEFAULT FALSE ,
    created_at TIMESTAMP DEFAULT NOW()
);`;

async function createTodosTable(){
    try{
        await pool.query(query);
        console.log("TODOS TABLE CREATED SUCCESFULLY");;

    }
    catch(error){
        console.log("error in creating Todos Table");
        console.log(error)
    }
}

export default createTodosTable;