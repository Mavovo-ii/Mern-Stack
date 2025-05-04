import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './routes/workouts.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()) // to parse JSON bodies

//app.use(cors());

app.use((req, res, next)=> {
    console.log(req.path, req.method)
    next()
})

app.use('/api/workouts',workoutRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    // listen for requests
    app.listen(process.env.PORT, () => {
        console.log(`Connected to DB and listening on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log({error: error.message})
})







