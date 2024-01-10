import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectdb.js'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'

// dotenv
dotenv.config();

// connection to db
connectDB()

const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json()) // to parse JSON data in the body
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes)

app.listen(PORT, () => {console.log(`started with ${PORT} `)})