import { pool } from "../connection.js";
import bcrypt from "bcrypt";

// Tulis SQL query
//letak placeholder
//handle request dlm try catch
const query = `
    INSERT INTO users(username, password,email,is_admin)
    VALUES($1,$2,$3,$4)
    ;

`

const SALTROUNDS = 11;

// buat async function
async function createUser(req,res){
// try catch block untuk error handling
    try{
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const isAdmin = req.body.isAdmin;

        //buat input validation

        if(!username||!password||!email){
            return res.status(400).json({
                message:"username,password and email is required"
            })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const isValidEmail = emailRegex.test(email);

        if(!isValidEmail){
            return res.status(400).json({
                message:"not a valid email"
            });
        }

        const salt = bcrypt.genSaltSync(SALTROUNDS);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await pool.query(query,[username,hashedPassword,email,isAdmin]);
        
        res.status(201).json({
            message:"User has been created"
        })
    }catch(error){
        res.status(500).json({
            message:"500 : Internal Server Error"
            // message:error
        })
        console.log(error);

    }

}

export default createUser;