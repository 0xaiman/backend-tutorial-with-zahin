import jwt from"jsonwebtoken"

function isAuth(req,res,next){
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1]
    // console.log("bearerToken : ",bearerToken)
    // console.log("token : ",token)

    if(!bearerToken){
        res.status(401).json({
            message:"Unauthorized"
        });
    }

    const secretkey ="secretkey"
    //hwt verify
    jwt.verify(token, secretkey, function(err, decoded) {
        if(err){
            res.status(401).json({
                message:"Unauthorized"
            });
        }
    //   console.log(decoded);
      res.locals.userId = decoded.id;
      res.locals.userEmail = decoded.email;
      next();

      });


}

export default isAuth;