import { useState } from "react";
import { onRegistration } from "../api/auth";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import registerImage from "../media/register/Register.png";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    invite_code: "",
    company_ein: "",
    full_name: "",
    company_info: ""
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
        [userType === "employee" ? "full_name" : "company_info"]:
          userType === "employee" ? values.full_name : values.company_info,
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
        company_info: ""
      });
    } catch (error) {
      let errorObj = {};
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((element) => {
          errorObj[element.path] = element.msg;
        });
      }
      setErrors(errorObj);
      setSuccess("");
    }
  };

  return (
    <div className="bg-[#F0FAFC] min-h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 py-12 px-6 lg:px-16">
        <div className="w-full lg:w-3/5 flex justify-center lg:justify-end mb-10 lg:mb-0">
          <img
            src={registerImage}
            alt="Register"
            className="w-4/5 lg:w-full object-contain rounded-3xl shadow-lg"
          />
        </div>
        <div className="w-full lg:w-2/5 bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-extrabold text-[#14213D]">Create an Account</h1>
            <p className="text-[#14213D] mt-2">Register your account below</p>
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

            {userType === "company" && (
              <div>
                <input
                  type="text"
                  name="company_info"
                  id="company_info"
                  onChange={onChange}
                  value={values.company_info}
                  placeholder="Company Name"
                  className="w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1]"
                  required
                />
                {errors.company_info && (
                  <div className="text-red-600 text-sm">{errors.company_info}</div>
                )}
              </div>
            )}

            {userType === "employee" && (
              <div>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  onChange={onChange}
                  value={values.full_name}
                  placeholder="Full Name"
                  className="w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1]"
                  required
                />
                {errors.full_name && (
                  <div className="text-red-600 text-sm">{errors.full_name}</div>
                )}
              </div>
            )}

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

            <div>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={onChange}
                value={values.confirmPassword}
                placeholder="Confirm Password"
                className={`w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1] ${
                  errors.confirmPassword ? "border-red-600" : ""
                }`}
                required
              />
              {errors.confirmPassword && (
                <div className="text-red-600 text-sm">{errors.confirmPassword}</div>
              )}
            </div>

            <div>
              <input
                type="text"
                name={userType === "employee" ? "invite_code" : "company_ein"}
                id={userType === "employee" ? "invite_code" : "company_ein"}
                onChange={onChange}
                value={userType === "employee" ? values.invite_code : values.company_ein}
                placeholder={userType === "employee" ? "Invite Code" : "Company EIN"}
                className="w-full p-3 border-b-2 border-[#14213D] text-gray-800 focus:outline-none focus:border-[#454FE1]"
                required
              />
              {errors[userType === "employee" ? "invite_code" : "company_ein"] && (
                <div className="text-red-600 text-sm">
                  {errors[userType === "employee" ? "invite_code" : "company_ein"]}
                </div>
              )}
            </div>

            {success && <div className="text-green-600 text-sm">{success}</div>}

            <div>
              <button
                type="submit"
                className="w-full py-3 bg-[#14213D] text-white rounded-lg font-semibold hover:bg-[#454FE1] transition duration-200"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to={`/login?userType=${userType}`}
                className="text-[#454FE1] font-semibold hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;