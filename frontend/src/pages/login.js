import { useState } from "react";
import { onLogin } from "../api/auth";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { useLocation } from "react-router-dom";
import "./css/login.css";
import loginImage from "../media/login/Login.png";
import Navbar from "../components/Navbar";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType") || "employee";

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values, userType);
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
    } catch (error) {
      let errorArray = [];
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((element) => {
          errorArray.push(element.msg);
        });
      }
      setErrors(errorArray);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-background">
        <div className="login-container">
          <div className="login-image-container">
            <img src={loginImage} alt="Login" className="login-image" />
          </div>
          <div className="login-form-container">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Login to your account below</p>

            <form onSubmit={(e) => onSubmit(e)} className="login-form">
              <div className="mb-3">
                <label htmlFor="email" className="form-label"></label>
                <input
                  onChange={(e) => onChange(e)}
                  type="email"
                  className="form-control line-input"
                  id="email"
                  name="email"
                  value={values.email}
                  placeholder="Email address"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"></label>
                <input
                  onChange={(e) => onChange(e)}
                  type="password"
                  className="form-control line-input"
                  id="password"
                  name="password"
                  value={values.password}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="error-messages">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
              <button type="submit" className="button_container">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
