import "../styles/navbar.css";
import { FaNewspaper } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaNewspaper />
        <span>TeluguAI Newsroom</span>
      </div>

      <div className="nav-links">
        <a href="/">Dashboard</a>
        <a href="/">Generate</a>
        <a href="/">Analytics</a>
      </div>
    </nav>
  );
}

export default Navbar;