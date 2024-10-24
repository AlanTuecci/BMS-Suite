import { useState } from "react";
import { onRegistration } from "../api/auth";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import './login.css';
import registerImage from '../media/register/Register.png';

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    company_ein: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const userType = location.state?.userType || "employee";

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }
    try {
      const { data } = await onRegistration(values, userType);
      setErrors({});
      setSuccess(data.message);
      setValues({ email: "", password: "", confirmPassword: "", company_ein: "" });
    } catch (error) {
      let errorObj = {};
      error.response.data.errors.forEach((element) => {
        errorObj[element.path] = element.msg;
      });
      setErrors(errorObj);
      setSuccess("");
    }
  };

  return (
    <div className="login-background">
      <Navbar /> 
      <div className="login-container">
        <div className="login-image-container">
          <img src={registerImage} alt="Register" className="login-image" />
        </div>
        <div className="login-form-container">
          <h1 className="login-title">Create an Account</h1>
          <p className="login-subtitle">Register your account below</p>
          <form onSubmit={onSubmit} className="login-form">
            <div className="mb-3">
              <label htmlFor="email" className="form-label"></label>
              <input
                onChange={onChange}
                type="email"
                className="form-control line-input"
                id="email"
                name="email"
                value={values.email}
                placeholder="Email address"
                required
              />
              {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label"></label>
              <input
                onChange={onChange}
                type="password"
                className="form-control line-input"
                id="password"
                name="password"
                value={values.password}
                placeholder="Password"
                required
              />
              {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label"></label>
              <input
                onChange={onChange}
                type="password"
                className={`form-control line-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                id="confirmPassword"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirm Password"
                required
              />
              {errors.confirmPassword && <div style={{ color: "red" }}>{errors.confirmPassword}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="company_ein" className="form-label"></label>
              <input
                onChange={onChange}
                type="text"
                className="form-control line-input"
                id="company_ein"
                name="company_ein"
                value={values.company_ein}
                placeholder="Company EIN"
                required
              />
              {errors.company_ein && <div style={{ color: "red" }}>{errors.company_ein}</div>}
            </div>
            <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
            <button type="submit" className="button_container">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
