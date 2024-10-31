import React from "react";
import Sidebar from "../components/sidebar";
import './css/dashboard.css';

function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="background">
        <Sidebar />
        <div className="text_container_d">
            <h2 className="header_design">Hello Lily</h2>
            <p className="date_design">{formattedDate}</p>
        </div>
        <div className="grid_container">
            <button className="grid_item"><span className="option_header">Timekeep</span><br/><p className="opt_description">Log your hours for <br/> the work week.</p></button>
            <button className="grid_item"><span className="option_header">Product <br/> Management</span><br/><p className="opt_description">Manage and Update Your <br/> Inventory</p></button>
            <button className="grid_item"><span className="option_header">Cash control</span> <p className="opt_description">Monitor and manage your <br/>revenue stream</p></button>
            <button className="grid_item"><span className="option_header">Help</span><p className="opt_description">Encountering a challenge? <br/> Seek assistance here.</p></button>
            <button className="grid_item"><span className="option_header">Settings</span><p className="opt_description">Modify settings to cater your <br/> needs.</p></button>
        </div>
    </div>
  );
}

export default Dashboard;