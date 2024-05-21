import crypto from "crypto";
import fs from "fs";
import path from "path";

function Shorten(req,res){
    // take the url from body
    // use crypto module to generate short url ( www.xxxxxx.com -> /abcde)
    //save into json
    // send the short url in the response

    // take url
    const url = req.body.url;

    //generate random url using crypto module
    const randomString = crypto.randomBytes(3).toString("hex");
    const shortUrl = `${randomString}`;


    //save into json in array fromat
    //[{url :www.url.com , shortUrl : /abc}]

    const linksFilePath = path.join(process.cwd(),"model","links.json");

    // read from existing json data
    let fileStringData = null
    try{
         fileStringData = fs.readFileSync(linksFilePath,{encoding:"utf-8"});
    }catch{
        fs.writeFileSync(linksFilePath,"[]");
    }

    if(!fileStringData){
        return Shorten(req,res);
    }
   
    const fileData = JSON.parse(fileStringData);
    console.log(fileData);
  
    // combine previous data with the new one
    const newData = {
        url:url,
        shortUrl:shortUrl
    };

    fileData.push(newData);
    //write data
    
    const stringData = JSON.stringify(fileData,null,2);
    fs.writeFileSync(linksFilePath,stringData);

    res.send(shortUrl);

}

export default Shorten;