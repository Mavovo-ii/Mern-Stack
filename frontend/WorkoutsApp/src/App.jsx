import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Home from "./pages/Home";
import { loader as WorkoutsLoader} from "./pages/Home";
import { action as WorkoutAction } from "./pages/Workoutform";
import Layout from "./pages/Layout/Layout"


const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} loader={WorkoutsLoader} action={WorkoutAction}/>
  </Route>

));

function App() {
  return <RouterProvider router={router} />;
}

export default App;
