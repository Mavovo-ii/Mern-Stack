import { Form, redirect, useActionData } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export async function action({ request }) {
  const formData = await request.formData();
  const workoutData = Object.fromEntries(formData);
  const workoutId = workoutData.id; // Get workout ID from the form data (if updating)

  // Validation: Check if any field is empty
  if (!workoutData.title || !workoutData.load || !workoutData.reps) {
    return { error: "Please fill all fields" }; // Return error message
  }

  const url = workoutId ? `/api/workouts/${workoutId}` : '/api/workouts'; // Determine URL
  const method = workoutId ? "PUT" : "POST"; // Use PUT for updating, POST for adding

  const response = await fetch(url, {
    method,
    body: JSON.stringify(workoutData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return { error: error.error };
  }

  return { success: workoutId ? "Workout updated successfully!" : "Workout added successfully!" }; // Return success message
}

const Workoutform = ({ workout, onFormReset }) => {
  const actionData = useActionData();

  // Use useEffect to trigger toast notifications after rendering
  useEffect(() => {
    if (actionData?.success) {
      toast.success(actionData.success, { containerId: "form-toast", autoClose: 2000 }); // Success toast
    }
    if (actionData?.error) {
      toast.error(actionData.error, { containerId: "form-toast", autoClose: 2000 }); // Error toast
    }
  }, [actionData]);

  const handleSubmit = (e) => {
    const form = e.target;
    setTimeout(() => {
      form.reset(); // Reset the form
      if (onFormReset) onFormReset(); // Notify parent to clear the workout prop
    }, 0);
  };

  return (
    <Form className="create" method="post" action="." onSubmit={handleSubmit}>
      <div>
        <h3>{workout ? "Update Workout" : "Add a New Workout"}</h3> {/* Dynamic heading */}
      </div>
      {workout && (
        <input type="hidden" name="id" value={workout._id} /> // Hidden input for workout ID
      )}

      <label>Exercise Title:</label>
      <input
        type="text"
        placeholder="Workout title"
        name="title"
        defaultValue={workout?.title || ""} // Pre-fill if updating
      />

      <label>Load:</label>
      <input
        type="number"
        placeholder="Workout load"
        name="load"
        defaultValue={workout?.load || ""} // Pre-fill if updating
      />

      <label>Reps:</label>
      <input
        type="number"
        placeholder="Workout reps"
        name="reps"
        defaultValue={workout?.reps || ""} // Pre-fill if updating
      />

      <button type="submit">{workout ? "Update Workout" : "Add Workout"}</button> {/* Dynamic button text */}
      
      {/* Render ToastContainer under the submit button */}
      <ToastContainer containerId="form-toast" position="bottom-right" />
    </Form>
  );
};

export default Workoutform;