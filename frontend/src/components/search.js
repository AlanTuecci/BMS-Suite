import React, { useState } from "react";
import "./css/search.css";
import { onInviteEmployee } from "../api/auth";

const Search = () => {
  const [values, setValues] = useState({
    employee_email: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const emailValue = {
        employee_email: values.employee_email,
      };
      const { data } = await onInviteEmployee(emailValue);
      setErrors({});
      setSuccess(data.message);
      setValues({ employee_email: "" });
    } catch (error) {
      let errorObj = { employee_email: error.response.data.error };
      setErrors(errorObj);
      setSuccess("");
    }
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <div className="mb-3">
        <input
          onChange={onChange}
          type="email"
          className="form-control line-input"
          id="employee_email"
          name="employee_email"
          value={values.employee_email}
          placeholder="Email address"
          required
        />
        {errors.employee_email && (
          <div style={{ color: "red" }}>{errors.employee_email}</div>
        )}
      </div>

      <div style={{ color: "green", margin: "10px 0" }}>{success}</div>
      <button type="submit" className="button_container">
        Invite Employee
      </button>
    </form>
  );
};

export default Search;
