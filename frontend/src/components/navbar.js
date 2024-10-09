import './navbar.css';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <nav className="navbar">
        <div className="left">
          <NavLink to="/">BMS Suite</NavLink>
        </div>
        <ul>
            <li><NavLink to= "/">Home</NavLink></li>
            <li><NavLink to= "/Home">Feature</NavLink></li>
            <li><NavLink to= "/Home">About</NavLink></li>
            <li><NavLink to= "/Home">Contact</NavLink></li>
        </ul>
        {authState.isAuth ? (
          <div>
          </div>
        ) : (
          <div>
          <div className="right">
            <button className='nav-button'><NavLink to="/login" className=""> Login</NavLink></button>
          </div> 
        </div>
        )}
    </nav>
  );
};

export default Navbar;
