import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/" className="nav-header">
          <h1>Workout Buddy</h1>
        </Link>
        <button className="header-add-workout">
          <FaPlus />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
