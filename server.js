

import express, { json } from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './db.js'
import morgan from 'morgan'
import cors from "cors"
import authRoute from './routes/authRoute.js'
import transactionRoutes from './routes/transactionRoutes.js'
import path from 'path'
// import catagoriRoute from './routes/catagoriRoute.js'
// import productRoute from './routes/productRoute.js'





const app = express()
dotenv.config()
connectDB()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use('/api/v1/auth',authRoute)
app.use('/api/v1/transation',transactionRoutes)
// app.use('/api/v1/catagori',catagoriRoute)
// app.use('/api/v1/product' , productRoute)
 
app.use(express.static(path.join(__dirname , "./client/build")))

app.get("*" , function(req , res){
   res.sendFile(path.join(__dirname , "./client/build/index.html"))
})

app.use('/hello' , (req , res)=>{
   try {
    res.send('<h1>hello from the server</h1>')

   } catch (error) {
    console.log('fail to connet')
   }
})
app.use((req, res, next) => {
   res.setHeader("Content-Security-Policy", "script-src 'self' https://js.stripe.com/v3");
   return next();
 });
const PORT = process.env.PORT

app.listen(PORT , (req , res)=>{
console.log(`the server successfully connected to port ${PORT} `.bgCyan.white)
} )