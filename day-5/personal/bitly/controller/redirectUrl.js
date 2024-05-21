import fs from "fs";
import path from "path";

function RedirectUrl(req,res){
    const shortUrl = req.params.shortUrl;
    // console.log(params); //params is basically getting the correspojnding generated shortUrl

    //Access file path to the JSON that containes the URL pairs
    const linksDirectoryPath = path.join(process.cwd(),"model","links.json");
    const linkDirectory = fs.readFileSync(linksDirectoryPath,{encoding:"utf-8"});
    // console.log(linkDirectory);
    const directoryData = JSON.parse(linkDirectory);
     const link = directoryData.find((link)=>link.shortUrl === shortUrl);
     const longUrl = link.url;

     //redirect
     res.redirect(301,longUrl);
}

export default RedirectUrl;