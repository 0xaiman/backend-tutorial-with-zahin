//import pool from connection js
import { pool } from "../connection.js";

//write query and asisign to variable query
const query = `
    SELECT * FROM users;
`
//async function

//export
export async function readAllUsers(req,res){
//try catch for err handling
    try{
        const dbRes = await pool.query(query);
        console.log(dbRes.rows);
        res.status(201).json(dbRes.rows);

    }catch(error){
        res.status(500).json({
            message:"500: Internal Server Error"
        })
    }
}

///GET SPECIFIC USER

const querySpecificUser = `
    SELECT * FROM users 
    WHERE id=$1;
`
export async function readUserById(req,res){
    try{
        const id = req.params.id;

        const dbRes = await pool.query(querySpecificUser,[id]);
        const userRes = dbRes.rows;

        if(userRes.length === 0){
            return res.status(400).json({
                message:`user id : ${id} does not exist`
            })
        }

        res.status(201).json(userRes);
        console.log(userRes);


    }catch(error){
        res.status(500).json({
            message:"500: Internal Server Error"
        })
    }
}
