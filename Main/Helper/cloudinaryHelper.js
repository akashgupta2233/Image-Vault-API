const cloudinary = require('../config/cloudinary.js')

const uploadToCloudinary=async(file)=>{
    try{
        const result = await cloudinary.uploader.upload(file.path);
        return {
            url:result.secure_url,
            publicId: result.public_id
        }
    }catch(err){
        console.error('Error while uploading to cloudinary', err);
        throw new Error('Error while uploading to cloudinary');
    }
}

module.exports = {
    uploadToCloudinary
}