require('dotenv').config()
const express = require('express')
const connectToDB = require('./database/db.js')
const authRouter = require('./routes/auth-routes.js')
const homeRoutes = require('./routes/home-routes.js')
const adminRoutes = require('./routes/admin-routes.js')
const imageRoutes = require('./routes/image-routes.js')

const app = express();
app.use(express.json());
app.use('/api/auth',authRouter)
app.use('/api/home', homeRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/image',imageRoutes)

const PORT = process.env.PORT || 3000;
connectToDB();

app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})