const express = require('express');
const app = express();
require('dotenv').config();

const dbConn = require('./config/db')
const authRouter = require('./routes/auth') 
const userRouter = require('./routes/user') 
const postRouter = require('./routes/post') 
const catRouter = require('./routes/category') 
const uploadRoutes = require('./routes/uploadRoutes')


dbConn;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/category', catRouter)
app.use('/uploads', uploadRoutes)

const port = process.env.PORT;
app.listen(port, ()=>console.log(`Server is running on port ${port}`))
