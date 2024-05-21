// function add(a,b){
//     const  result = a+b;
//     console.log(result)
//     return result;
// }

// function mathCallback(a,b,callback){
//     callback(a,b);
// }

// mathCallback(1,2,add)

const fs = require('fs');

fs.writeFile("message.txt","test Filesystem write in Nodejs", 'utf-8',function(error){
    if(error){
        console.log("err");
    }else{
        console.log("write file success")
    }
})

fs.readFile("message.txt","utf-8",function(error,data){
    if(error){
        console.log("cannot read file")
    }else{
        console.log(data)
    }
})