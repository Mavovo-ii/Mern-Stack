import React, { useState } from 'react';
import Workoutform from './Workoutform';
import { getWorkouts } from '../utils/getWorkouts';
import { useLoaderData } from 'react-router-dom';
import formatDistanceTNow from 'date-fns/formatDistanceToNow';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export function loader() {
    return getWorkouts();
}

const Home = () => {
  const workouts = useLoaderData();
  const [selectedWorkout, setSelectedWorkout] = useState(null); // Track the workout being edited

  const handleClick = async (workoutId) => {
    try {
      const response = await fetch(`/api/workouts/${workoutId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }

      console.log(`Workout with ID ${workoutId} deleted successfully`);
      window.location.reload(); // Reload to refresh the list
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  const handleEdit = (workout) => {
    setSelectedWorkout(workout); // Set the workout to be edited
  };

  const handleFormSubmit = () => {
    setSelectedWorkout(null); // Reset the form to "Add Workout" state
  };

  const handleFormReset = () => {
    setSelectedWorkout(null); // Clear the selected workout after submission
  };

  const workoutElements = workouts.map((workout) => (
    <div className="workout-container" key={workout._id}>
      <div className="workout-tile">
        <h4>{workout.title}</h4>
        <p>
          <span className="load">Load:</span> {workout.load}kg
        </p>
        <p>
          <span className="reps">Reps:</span> {workout.reps}
        </p>
        <small>
          {formatDistanceTNow(new Date(workout.createdAt), { addSuffix: true })}
        </small>
      </div>
      <div className="btn-group">
        <button
          onClick={() => handleClick(workout._id)}
          className="workout-delete-button"
        >
          <MdDelete />
        </button>
        <button
          onClick={() => handleEdit(workout)} // Set the workout to be edited
          className="edit"
        >
          <FaEdit />
        </button>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <div className="home-container">
        <div>{workoutElements}</div>
        <Workoutform workout={selectedWorkout} onFormSubmit={handleFormSubmit} onFormReset={handleFormReset} /> {/* Pass callback */}
      </div>
    </div>
  );
};

export default Home;