export async function getWorkouts() {
    const response = await fetch('/api/workouts')
    const data = response.json()
    return data
}