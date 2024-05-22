// import pool
import { pool } from "../connection.js";


//query with placeholder 
// bcs only wnat to view users own todo
const query = `
        SELECT * FROM todos
        WHERE user_id = $1
        ;
    `

// async await
async function readTodo(req,res){
    //try catch
    try{
        const userId = res.locals.userId
        const userEmail = res.locals.userEmail

        // console.log("user Id is : ",res.locals.userId)
        // console.log("user email is : ",res.locals.userEmail)

         const dbRes =await pool.query(query,[userId]);
        // console.log(dbRes.rows);
        res.status(201).json({
            message:`${dbRes.rows.length} entries found for ${userEmail}`,
            data:dbRes.rows});

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500 : Internal Server Error"
        })
    }

}

//export
export default readTodo;