import { useState } from "react";
import { onRegistration } from "../api/auth";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./css/login.css";
import registerImage from "../media/register/Register.png";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    invite_code: "",
    company_ein: "",
    full_name: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType") || "employee";

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
      const registrationValues = {
        email: values.email,
        password: values.password,
        [userType === "employee" ? "invite_code" : "company_ein"]:
          userType === "employee" ? values.invite_code : values.company_ein,
        ...(userType === "employee" && { full_name: values.full_name }),
      };
      const { data } = await onRegistration(registrationValues, userType);
      setErrors({});
      setSuccess(data.message);
      setValues({
        email: "",
        password: "",
        confirmPassword: "",
        invite_code: "",
        company_ein: "",
        full_name: "",
      });
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
    <div>
      <Navbar />
      <div className="login-background">
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
                  className={`form-control line-input ${
                    errors.confirmPassword ? "is-invalid" : ""
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
                {errors.confirmPassword && (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                )}
              </div>

              {userType === "employee" && (
                <div className="mb-3">
                  <label htmlFor="full_name" className="form-label"></label>
                  <input
                    onChange={onChange}
                    type="text"
                    className="form-control line-input"
                    id="full_name"
                    name="full_name"
                    value={values.full_name}
                    placeholder="Full Name"
                    required
                  />
                  {errors.full_name && <div style={{ color: "red" }}>{errors.full_name}</div>}
                </div>
              )}

              <div className="mb-3">
                <label
                  htmlFor={userType === "employee" ? "invite_code" : "company_ein"}
                  className="form-label"
                ></label>
                <input
                  onChange={onChange}
                  type="text"
                  className="form-control line-input"
                  id={userType === "employee" ? "invite_code" : "company_ein"}
                  name={userType === "employee" ? "invite_code" : "company_ein"}
                  value={userType === "employee" ? values.invite_code : values.company_ein}
                  placeholder={userType === "employee" ? "Invite Code" : "Company EIN"}
                  required
                />
                {errors[userType === "employee" ? "invite_code" : "company_ein"] && (
                  <div style={{ color: "red" }}>
                    {errors[userType === "employee" ? "invite_code" : "company_ein"]}
                  </div>
                )}
              </div>
              <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
              <button type="submit" className="button_container">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
