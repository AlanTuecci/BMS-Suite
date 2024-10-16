import Layout from "../components/layout";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './home.css';
import hompic from '../components/HomeScreen.png';

const Home = () => {
  const authState = useSelector((state) => state.auth);

  return (
    <div className="background">
    <Layout>
      <div className="text_container">
        <h1>Designed to Improve <br /> The Efficiency of Operations</h1>
        <p>Revolutionizing Business Management Services. <br /> In an All-In-One Package.</p>
        <br />
        <div className="action_buttons">
          <button className="button_container">
            <NavLink to="/register">Register</NavLink>
          </button>
          <button className="button_container">
            <NavLink to="/login">Login</NavLink>
          </button>
        </div>
        <br />
        <img className="pic_container" src={hompic} alt="" />
      </div>
    </Layout>
    </div>
  );
};

export default Home;
