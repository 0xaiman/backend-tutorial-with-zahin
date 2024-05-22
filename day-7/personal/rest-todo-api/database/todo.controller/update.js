//import 
import { pool } from "../connection.js";

//query

const query = `
    UPDATE todos
    set status = $1
    WHERE id = $2
    ;
`

async function updateStatus(req,res){
    try{
        const id = req.body.id;
        const status  = req.body.status;
        await pool.query(query,[status,id]);

        res.status(201).json({
            message:`Todo No. ${id} has been updated`
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500: Internal Server Error"
        })
    }
}

export default updateStatus;