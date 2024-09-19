import { useState } from "react";
import Layout from "../components/layout";
import { onRegistration } from "../api/auth";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setErrors([]);
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      let errorArray = [];
      error.response.data.errors.forEach((element) => {
        errorArray.push(element.msg);
      });
      setErrors(errorArray);
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
        </div>
        <div style={{ color: "red", margin: "10px 0" }}>
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
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
