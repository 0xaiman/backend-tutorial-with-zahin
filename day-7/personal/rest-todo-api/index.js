// invoke EXPRESS

import express from "express";
import healthCheck from "./controller/healthCheck.js";
import notFound from "./controller/notfound.js";
import { testConnect } from "./database/connection.js";
import createUser from "./database/user.controller/create.js";
import { readAllUsers, readUserById } from "./database/user.controller/read.js";
import updateUserById from "./database/user.controller/update.js";
import  deleteUser  from "./database/user.controller/delete.js";

const app = express();
const PORT = 8787;

//middelware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//test connectingtion to db
testConnect();

//a GET health controller
app.get('/',healthCheck.get);
app.post('/',healthCheck.post);
app.post('/users',createUser);
app.get('/users',readAllUsers);
app.get('/users/:id',readUserById);
app.put('/users/:id',updateUserById);
app.delete('/users/:id',deleteUser);
//404 response

app.use(notFound);

// server listening

app.listen(PORT,()=>{
    console.log(`SERVER ${PORT} IS RUNNING OK`);
})