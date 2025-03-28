import React, { useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import loginImage from "../media/login/Login.png";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("userType") || "employee";

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: values.email,
      password: values.password,
    };

    const { success, errors } = await loginUser(loginData, userType);

    if (success) {
      setErrors({});
      setSuccess("Login successful!");
      navigate("/bms-suite/dashboard");
    } else {
      const errorObj = {};
      errors.forEach((err) => {
        errorObj[err.path] = err.msg;
      });
      setErrors(errorObj);
      setSuccess("");
    }
  };

  return (
    <div className="bg-[#F0FAFC] min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 py-12 px-6 lg:px-16">
        <div className="w-full lg:w-3/5 flex justify-center lg:justify-end mb-10 lg:mb-0">
          <img src={loginImage} alt="Login" className="w-4/5 lg:w-full object-contain rounded-3xl shadow-lg" />
        </div>
        <div className="w-full lg:w-2/5 bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">Log In To Your Account</h1>
          </div>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                onChange={onChange}
                value={values.email}
                placeholder="Email address"
                className="w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1]"
                required
              />
              {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="password"
                onChange={onChange}
                value={values.password}
                placeholder="Password"
                className="w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1]"
                required
              />
              {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
            </div>
            {success && <div className="text-green-600 text-sm">{success}</div>}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-[#14213D] text-white rounded-lg font-semibold hover:bg-[#454FE1] transition duration-200"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to={`/bms-suite/register?userType=${userType}`}
                className="text-[#454FE1] font-semibold hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
