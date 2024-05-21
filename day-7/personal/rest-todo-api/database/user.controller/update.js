//import pool
import { pool } from "../connection.js";

//query

const query = `
UPDATE users
SET username = $1, email =$2 , password =$3
WHERE id= $4
;
`
//need another query to see if user did exist in the table or not
const queryCheckUserExist = `
    SELECT * FROM users WHERE id=$1
`

async function checkUserExist(id){
    try{

        const dbRes = await pool.query(queryCheckUserExist,[id]);
        // console.log(dbRes.rows);
        return dbRes.rows.length>0 ; 


    }catch(error){
        throw new Error("Error Chacking User existence");

    }
}


//async

async function updateUserById(req,res){
    try{
    //try cstch
    // await pool query
    //variable assignments on params and body elemnts

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const id = req.params.id

      //check if user exist in databse

      const isUserExist = await checkUserExist(id);

      if(!isUserExist){
          return res.status(404).json({
              message:`User of ID : ${id} does not exist`
          })
      }

    // input validation 
    if(!username||!email||!password){
        return res.status(401).json({
            message:"Invalid Input"
        })
    }

    //email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegex.test(email);

    if(!isValidEmail){
        return res.status(400).json({
            message:`${email} is not a valid email`
        });
    }

  


   const dbRes =  await pool.query(query,[username,email,password,id]);

    
    res.status(201).json({
        
        messge:`User of ID : ${id} info has been changed successfullly`
    })


    }catch(error){
        res.status(500).json({
            message:"500 : Internal Server Error"
        })
        console.log(error)
    }
}

export default updateUserById;