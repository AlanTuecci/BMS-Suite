import { useState } from "react";
import Layout from "../components/layout";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    company_ein: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
      const { data } = await onRegistration(values);
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
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className="container mt-3">
        <h1>Register</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="email"
            required
          />
          {errors.email && <div style={{color: "red" }}>{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={values.password}
            placeholder="password"
            required
          />
          {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && <div style={{color: "red"}}>{errors.confirmPassword}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="company_ein" className="form-label">
            Company EIN
          </label>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            className="form-control"
            id="company_ein"
            name="company_ein"
            value={values.company_ein}
            placeholder="EIN"
            required
          />
          {errors.company_ein && <div style={{ color: "red"}}>{errors.company_ein}</div>}
        </div>
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Register;
