const express = require('express')
const authMiddleware = require('../middleware/auth-middleware.js')
const adminMiddleware = require('../middleware/admin-middleware.js')
const uploadMiddleware = require('../middleware/upload-middleware.js')
const {uploadImageController, getAllImages, deleteImage} = require('../controllers/image-controller')

const router = express.Router();

router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image') ,uploadImageController)
router.get('/get',authMiddleware, getAllImages)
router.delete('/delete/:id',authMiddleware, deleteImage)

module.exports = router;