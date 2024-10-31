import './css/navbar.css';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="left">
          <NavLink to="/">BMS Suite</NavLink>
        </div>
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Dashboard">Feature</NavLink></li>
            <li><NavLink to="/Home">About</NavLink></li>
            <li><NavLink to="/Home">Contact</NavLink></li>
        </ul>
    </nav>
  );
};

export default Navbar;