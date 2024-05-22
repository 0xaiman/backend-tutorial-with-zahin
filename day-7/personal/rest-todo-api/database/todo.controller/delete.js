//import 
import { pool } from "../connection.js";

//query

const query = `
    DELETE FROM todos
    WHERE id = $1
    ;
`

//async await (fetch data from db)
async function deleteTodo(req,res){
//try catch (error handling)
    try{
        const id = req.params.id;
        // const userId = req.params.id;

        await pool.query(query,[id]);

        res.status(201).json({
            message:`Todo entry No. ${id}  has been deleted`
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500 : Internal Server Error"
        })
    }


}

//export
export default deleteTodo;