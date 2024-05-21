// const http = require("node:http");

// const server = http.createServer((req,res)=>{
//     // 1) return HTML
//     // res.writeHead(200,{"Content-type":"text/html"});
//     // res.write("<h1>Server Response : 200</h1>");
//     // res.end();
//     //2) return JSON data
//     // res.writeHead(200,{"Content-type":"application/json"});
//     // res.write(JSON.stringify({name:"aiman", age:30, gender:"male", occupation:"N/A"}));
//     // res.end();
//     //3) Redirect to other url
//     // res.writeHead(301,{location:"https://www.google.com"})
//     // res.end();

//     //4) Logical example of using res and req
//     const url = req.url;
//     console.log(url);
//     if(url ==='/'){
//         res.writeHead(200,{"Content-type":"text/html"});
//         res.write(`
//         <div style="background-color:red">
//            <h1>Home</h1>
//         </div>
//         `);
//         res.end();
//         return;

//     }

//     if(url === '/about'){
//         res.writeHead(200,{"Content-type":"text/html"});
//         res.write(`
//         <div style="background-color:blue">
//             <h1>About</h1>
//         </div>    
//             `)
//         res.end();
//         return;
        
//     }

//     if(url === '/youtube'){
//         res.writeHead(301,{location:"https://youtube.com"});
//         res.end();
//         return;
//     }
//     if(url === '/data'){
//         res.writeHead(200,{"Content-type":"application/json"});
//         res.write(JSON.stringify({name:"aiman", age:27}));
//         res.end();
//         return;
//     }

//     res.writeHead(404,{"Content-type":"text/html"});
//     res.write(`
//     <div style="background-color:yellow">
//         <h1> 404 NOT FOUND </h1>
//     </div>
//     `);
//     res.end();


// });

// server.listen(8000);


const http = require('http');
const fs= require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname,"pages","index.html");
const indexHtml = fs.readFileSync(indexHtmlPath,"utf-8");
const aboutHtmlPath = path.join(__dirname,"pages","about.html");
const aboutHtml = fs.readFileSync(aboutHtmlPath,"utf-8");
const errHtmlPath = path.join(__dirname,"pages","notFound.html");
const errHtml = fs.readFileSync(errHtmlPath,"utf-8");

//import stles.css
const cssPath = path.join(__dirname,"public","styles.css");
const css = fs.readFileSync(cssPath,"utf-8");

//import js script

const jsPath=path.join(__dirname,"public","script.js");
const js=fs.readFileSync(jsPath,"utf-8");

let visitorCount = 0;

const server = http.createServer((req,res)=>{
    const url = req.url;

    if(url==='/styles.css'){
        res.writeHead(200, {"Content-type":"text/css"});
        res.write(css);
        res.end();
        return
    }
    if(url==='/script.js'){
        res.writeHead(200, {"Content-type":"text/javascript"});
        res.write(js);
        res.end();
        return
    }

    if(url ==='/'){
        visitorCount++;
        console.log("Visitor Count :",visitorCount);
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(indexHtml);
        res.end();
        return;
    }
    if(url ==='/about'){
        res.writeHead(200,{"Content-type":"text/html"});
        res.write(aboutHtml);
        res.end();
        return;
    }

    res.writeHead(404,{"Content-type":"text/html"});
    res.write(errHtml);
    res.end()  

});

server.listen(8888);