import React from "react";
import "./css/invite.css";
import Sidebar from "../components/Sidebar";
import Emptable from "../components/Emptable";
import Search from "../components/Search";

function invite() {
  return (
    <div className="background">
      <Sidebar />
      <h2 className="header_design text_container_d">Invite Users</h2>
      <Emptable />
      <h3 className="invite_prompt">Send invite to employee email: </h3>
      <div className="search">
        <Search />
      </div>
    </div>
  );
}

export default invite;
