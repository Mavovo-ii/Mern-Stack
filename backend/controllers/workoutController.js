import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// Get all workouts
export const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
    res.status(500).json({ error: error.message });
};

// Get a single workout
export const getWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "ID is not valid"});
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
}
// Create a new workout
export const createWorkout = async(req, res) => {
    try {
        const { title, load, reps } = req.body;
        const workout = await Workout.create({ title, load, reps });
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a workout
 export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Workout not found" });
    }

    const workout = await Workout.findByIdAndDelete({_id: id});

    if (!workout) {
        return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json(workout);
 }

 //update a workout

 export const updateWorkout = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Workout not found" });
    }
    
    const workout = await Workout.findByIdAndUpdate({_id:id}, {
        ...req.body
    });
   
    if(!workout) {
        return res.status(400).json({error: "Workout not found"});
    }

    res.status(200).json(workout);
 }
