import Layout from "../components/layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './home.css'
import hompic from '../components/HomeScreen.png'

const Home = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <div className="background">
    <Layout>
      <div className="text_container">
        <h1><b></b>Designed to Improve <br></br> The Efficency of operations</h1>
        <p1>Revolutionizing Business Management Services. <br></br>In an All-In-One Package.</p1>
        <br></br>
        <button className="button_container">Try Demo</button>
        <br></br>
        <img className="pic_container" src={hompic} alt = ''/>

      </div>

      {/* {authState.isAuth ? (
        <div>
          <h2>Welcome back! You have successfully signed in and can now access the site!</h2>
          <NavLink to="/placeholder">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Placeholder
            </button>
          </NavLink>
        </div>
      ) : (
        <div>
          <h2>Please sign in or create an account to get started.</h2>
          <NavLink to="/login">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "10px 10px 0 0" }}
            >
              Register
            </button>
          </NavLink>
        </div>
      )} */}
    </Layout>
    </div>
  );
};

export default Home;
