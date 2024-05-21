import fs from "fs";
import path from "path";

function Home(req,res){
    const indexHtmlPath = path.join(process.cwd(),"pages","index.html");
    const indexHtml = fs.readFileSync(indexHtmlPath,"utf-8");
    res.send(indexHtml);
}

export default Home;