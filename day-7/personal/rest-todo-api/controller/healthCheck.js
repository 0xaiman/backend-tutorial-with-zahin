function get(req,res){
    const resObj = {
        message :"todo server is running",
        data :true
    }

    res.status(200).json(resObj);
}

function post(req,res){
    const body = req.body;
    const resObj = {
        message:"todo server is running",
        data:body
    }
    res.status(200).json(resObj);
}

const healthCheck = {
    get:get,
    post:post
}

export default healthCheck;