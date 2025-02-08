const jwt = require('jsonwebtoken')

const authMiddleware=(req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if(!token){
        res.status(401).json({
            success:false,
            message:"No token provided. login"
        })
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_Secret_Key)
        console.log(decodedToken);
        req.userInfo = decodedToken;
        next();
    }catch(e){
        return res.status(401).json({
            success:false,
            message:"Error Occured.",
            err:e||e.message
        }) 
    }
}

module.exports = authMiddleware;