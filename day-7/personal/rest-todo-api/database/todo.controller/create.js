//import
import { pool } from "../connection.js";


//query 
const query = `
    INSERT INTO todos (text, user_id)
    VALUES ($1,$2)
    ;
`

///async await
async function inputTodo(req,res){
///try catch
    try{
        const text = req.body.text;
        const userId = req.body.user_id;


        //validations
        if(!text||!userId){
            res.status(401).json({
                message:"Bad Request"
            })
        }
       
        await pool.query(query,[text,userId]);


        res.status(201).json({
            message:"Todo entry successfully created"
        })

    }catch(error){
        res.status(500).json({
            
            message:"500:Internal Server Error"
        })
    }

}

//export

export default inputTodo;