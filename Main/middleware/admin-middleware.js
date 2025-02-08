

const isAdminUser=(req, res, next)=>{
    if(req.userInfo.role!=='admin'){
        return res.status(403).json({
            success:false,
            message:"Access Denied"
        })
    }
    next();
}

module.exports = isAdminUser;