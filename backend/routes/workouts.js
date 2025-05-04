import express from 'express';
import { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', getWorkouts) //get all workouts

router.get('/:id', getWorkout) //get a single workout

router.post('/', createWorkout) // create a new workout

router.put('/:id', updateWorkout); // Add a PUT route for updating a workout

router.delete('/:id', deleteWorkout) // delete a workout

export default router;