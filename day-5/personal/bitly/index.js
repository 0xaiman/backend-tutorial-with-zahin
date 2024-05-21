import express from "express";
import Home from "./controller/home.js";
import Dashboard from "./controller/dashboard.js";
import Shorten from "./controller/shorten.js";
import RedirectUrl from "./controller/redirectUrl.js";


const app = express();
const PORT = 8989;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", Home);

app.get("/dashboard",Dashboard);

app.use("/shorten",Shorten);

app.get("/:shortUrl",RedirectUrl);

app.listen(PORT,()=>{
    console.log(`Server is running at PORT : ${PORT}`);
})