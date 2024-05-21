//import pool
import { pool } from "../connection.js";

///custom query for DELETE
const query = `
    DELETE FROM users
    WHERE id = $1
    ;
`

const queryCheckUserExist = `
    SELECT * FROM users
    WHERE id = $1
    ;
`

async function checkUserExist(id){
   
   try{
    const resDb = await pool.query(queryCheckUserExist, [id]);
    return resDb.rows.length> 0;

   }catch(error){

     throw new Error("Error in checking if user Exist");
   }
}


//asunc await
async function deleteUser(req,res){
//try catch
    try{
        //assign id variable 
        //handle params
        const id = req.params.id;
        await pool.query(query,[id]);

        const isUserExist = await checkUserExist(id);

        if(!isUserExist){
            return res.status(404).json({
                message:`User of ID: ${id} does not exist`
            })
        }

        res.status(200).json({
            message:`user ${id} has been deleted`
        })

    }catch(error){
        res.status(500).json({
            message:"500:Internal Server Error"
        })
    }

}

//export
export default deleteUser;