import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/connectdb.js'


dotenv.config();

connectDB()
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {console.log(`started with ${PORT} `)})