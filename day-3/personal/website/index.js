const http = require("http");
const fs = require("fs");
const path = require("path");

//deklarasi path dan pembacaan html file untuk dirender
const indexPath = path.join(__dirname,'pages','index.html'); 
const indexHtml = fs.readFileSync(indexPath,"utf-8");

const projectsPath = path.join(__dirname,'pages','projects.html');
const projectsHtml = fs.readFileSync(projectsPath,"utf-8");

const pageNotFoundPath = path.join(__dirname,'pages','404.html');
const pageNotFoundHtml = fs.readFileSync(pageNotFoundPath,"utf-8");

//declaring css path
const cssPath = path.join(__dirname,"public","styles.css");
const cssRead = fs.readFileSync(cssPath,"utf-8");

//declare script
const scriptPath = path.join(__dirname,"public","script.js");
const scriptRead = fs.readFileSync(scriptPath,"utf-8");

let visitorCount = 0;

const server = http.createServer((req,res)=>{
    
    //1) declaring url request path
    const url =req.url



    if(url==='/styles.css'){
        res.writeHead(200,{"Content-type":"text/css"});
        res.write(cssRead);
        res.end();
        return;
    }

    if(url==='/script.js'){
        res.writeHead(200,{"Content-type":"text/javascript"});
        res.write(scriptRead);
        res.end();
        return;
    }

    //2) check path
    if(url ==='/'){
        visitorCount++;
        console.log("User Visited : ",visitorCount)
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(indexHtml);
        res.end();
        return;
    }

    if(url === '/projects'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(projectsHtml);
        res.end();
        return;
    }

    res.writeHead(404, {"Content-type":'text/html'});
    res.write(pageNotFoundHtml);
    res.end();
   
});

server.listen(8000,()=>{
    console.log("website running at : 8000");
});