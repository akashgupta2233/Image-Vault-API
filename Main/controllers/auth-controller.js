const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register=async(req, res)=>{
    try{
        const {username, email, password, role} = req.body;
        const user = await User.findOne({$or:[{username} , {email}]})
        if(!user){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({username, email, password:hashedPassword, role:role||'user'});
            res.status(200).json({
                success:true,
                message:"User Registered",
                data:newUser
            })
        }else{
            res.status(200).json({
                success:false,
                message:"User already exists",
            })
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Some error occured",
            err:err
        })
    }
}

const login=async(req, res)=>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(user){
           const passwordMatch = await bcrypt.compare(password, user.password);
           if(passwordMatch){
            const accessToken = jwt.sign({
                username:user.username,
                userId:user._id,
                role:user.role
            }, process.env.JWT_Secret_Key , {expiresIn:'7d'})
            res.status(200).json({
                success:true,
                message:"Login Completed",
                token:accessToken,
                data:user,
            })
           }else{
            res.status(404).json({
                success:false,
                message:"Incorrect password"
            })
           }
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:"Some error occured",
        })
    }
}

const changePassword=async(req, res)=>{
    try{
        const id = req.userInfo.userId;
        const userRecord = await User.findById({_id:id});
        if(userRecord){
            const{oldPassword, newPassword} = req.body;
            const correctPassword = await bcrypt.compare(oldPassword, userRecord.password);
            if(correctPassword){
                const salt = await bcrypt.genSalt(10);
                const hashedNewPassword = await bcrypt.hash(newPassword, salt);
                userRecord.password = hashedNewPassword;
                await userRecord.save();
                res.status(200).json({
                    success:true,
                    message:"Password updated"
                })
            }else{
                res.status(404).json({
                    success:false,
                    message:"Incorrect password"
                })
            }
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Some Error ",
            err:e.message || e
        })
    }
}

module.exports = {register, login, changePassword};