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
        const userId = res.locals.userId;

        // console.log(dbRes)
        // check if entry exist or not

        const queryEntryExist = `
            SELECT * FROM todos
            WHERE id = $1 and user_id =$2
            ;
        `
        const dbExist = await pool.query(queryEntryExist,[id, userId]);
        
        if(dbExist.rows.length===0){
            return res.status(401).json({
                message:"Bad Request"
            });
        }
        console.log(dbExist.rows)

        console.log(typeof id)
        console.log(typeof dbExist.rows[0].id)

        if(dbExist.rows[0].id!==Number(id)){
            return res.status(401).json({
                message:"Bad Request"
            });
        }


        const dbRes = await pool.query(query,[status,id]);

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