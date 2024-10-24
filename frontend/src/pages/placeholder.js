import Layout from "../components/layout";
import { onLogout } from "../api/auth";
import { unAuthenicateUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import Sidebar from "../components/sidebar";
import '../components/css/sidebar.css'

const Placeholder = () => {
  const dispatch = useDispatch();

  const logout = async () => {
    await onLogout();
    dispatch(unAuthenicateUser());
    localStorage.removeItem("isAuth");
  };

  return (
    <Layout>
      < Sidebar/>
      <h1>BMS-Suite Site Prototype</h1>

      <br></br>

      <h2>Empty page - This can only be accessed if signed in!</h2>

      <br></br>

      <button onClick={() => logout()} className="btn btn-primary" style={{ margin: "10px 10px 0 0" }}>
        Logout
      </button>
    </Layout>
  );
};

export default Placeholder;
