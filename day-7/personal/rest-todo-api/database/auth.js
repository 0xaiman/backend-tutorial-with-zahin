import { pool } from "./connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// variable email and password
//query for login

const query = `
    SELECT * FROM users
    WHERE email = $1
    ;
`

//asyncy await (db call)
async function loginUser(req,res){
    try{
        const email = req.body.email;
        const password = req.body.password;

        //input  validation
        if(!email||!password){
            return res.status(401).json({
                message:"Invalid Inputs"
            });
        }

        //user exist validation
        const dbRes = await pool.query(query,[email]);

        const data = dbRes.rows[0];
        

        if(!data){
            return   res.status(401).json({
                message:"User Does not Exist"
            });

        }

        //password validation
        //usingbcrypt
        const isValidPassword = bcrypt.compareSync(password,data.password);
        // console.log(isValidPassword)
        if(!isValidPassword){
            return   res.status(401).json({
                message:"Invalid Password"
            });
        }

        const secretkey = 'secretkey';
        const userData = {
            id : data.id,
            email: email
        }

        //create jwt token
        const token = jwt.sign(userData, secretkey);


        res.status(201).json({
            message:`Token Created`,
            token:token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"500: Internal Server Error"
        })
    }
}
//try catch (err handling)

//export
export default loginUser;