const express = require('express')
const {register, login, changePassword } = require('../controllers/auth-controller.js')
const authMiddleware = require('../middleware/auth-middleware.js')

const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.put('/update', authMiddleware, changePassword)

module.exports = router;