import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div>
          <NavLink to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </NavLink>
        </div>
        {authState.isAuth ? (
          <div>
            <NavLink to="/placeholder" className="mx-3">
              <span>Placeholder</span>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="mx-3">
              <span>Login</span>
            </NavLink>

            <NavLink to="/register" className="mx-3">
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
