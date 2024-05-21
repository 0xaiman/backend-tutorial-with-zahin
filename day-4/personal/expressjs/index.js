const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 8989;

app.use(express.static("public"));

//initialize body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',function(req,res){
    const homeHtmlPath = path.join(__dirname,'pages','index.html');
    const homeHtml = fs.readFileSync(homeHtmlPath,"utf-8");
    res.setHeader("Content-type","text/html");
    res.send(homeHtml);
})
app.get('/bmi-form',function(req,res){
    const bmiCalcHtmlPath = path.join(__dirname,'pages','bmi-form.html');
    const bmiCalcHtml = fs.readFileSync(bmiCalcHtmlPath,"utf-8");
    res.setHeader("Content-type","text/html");
    res.send(bmiCalcHtml);
})
app.post('/bmi-result',function(req,res){
    // const bmi = req.query.bmi;
    // console.log(bmi)
    const data = req.body;
    const weight = data.weight;
    const height = data.height;
    const bmi = weight/(height*height).toFixed(2);

    console.log(bmi);
    const bmiResultHtmlPath = path.join(__dirname,'pages','bmi-result.html');
    let  bmiResultHtml = fs.readFileSync(bmiResultHtmlPath,"utf-8");
    if(bmi){
        bmiResultHtml=bmiResultHtml.replace("[[BMI-RESULT]]",bmi)
    }else{
        bmiResultHtml=bmiResultHtml.repnb nnnnnnnnnlace("[[BMI-RESULT]]"," - ")
    }
    res.setHeader("Content-type","text/html");
    res.send(bmiResultHtml);
})
// app.post("/calculate",function(req,res){
   
//     res.redirect('/bmi-result'+"?bmi="+bmi);
// })

app.use(function(req,res){
    const notFoundHtmlPath = path.join(__dirname,'pages','404.html');
    const notFoundHtml = fs.readFileSync(notFoundHtmlPath,"utf-8");
    res.setHeader("Content-type","text/html");
    res.send(notFoundHtml);
})

app.listen(PORT,function(){
    console.log(`server is running at PORT ${PORT}`);
})