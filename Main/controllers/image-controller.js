const Image = require('../models/Image.js')
const {uploadToCloudinary } = require('../Helper/cloudinaryHelper.js')
const fs = require('fs')
const path = require('path')
const cloudinary = require('../config/cloudinary.js')

const uploadImageController=async(req, res)=>{
    try{
        if(!req.file){
            res.status(400).json({
                success:false,
                message:"File is required, upload image"
            })
        }else{
            const { url, publicId } = await uploadToCloudinary(req.file);
            const newlyUploadedImage = await Image.create({
                url,
                publicId,
                uploadedBy: req.userInfo.userId 
            })
            res.status(201).json({
                success:true,
                message:"Image uploaded successfully",
                image: newlyUploadedImage 
            })
            fs.unlinkSync(req.file.path)
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message: "Something went wrong",
            err:e.message || e
        })
    }
}

const getAllImages=async(req, res)=>{
    try{
        const page = parseInt(req.query.page) || 1 ;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page-1)*limit;
        const sortBy = req.query.sortBy | 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);
        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        res.status(200).json({
            success:true,
            message:"Images retrived",
            currentPage :page,
            totalPages : totalPages,
            totalImages:totalImages,
            data:images
        })
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Failed to retrive images",
            err: e || e.message
        })
    }
}

const deleteImage=async(req, res)=>{
    try{
        const imageId = req.params.id;
        const img = await Image.findById(imageId);
        if(img){
            const userId = req.userInfo.userId;
            if(img.uploadedBy.toString()===userId){
                await cloudinary.uploader.destroy(img.publicId);
                const delImage = await Image.findByIdAndDelete(imageId);
                res.status(200).json({
                    success:true,
                    message:"Image deleted",
                    data:delImage
                })
            }else{
                res.status(404).json({
                    success:false,
                    message:"Unauthorized to delete",
                })
            }
        }else{
            res.status(404).json({
                success:false,
                message:"Invalid Id",
            })
        }
    }catch(e){
        res.status(500).json({
            success:false,
            message:"Some Error occured",
            err:e|e.message
        })
    }
}

module.exports = {
    uploadImageController,
    getAllImages,
    deleteImage
}