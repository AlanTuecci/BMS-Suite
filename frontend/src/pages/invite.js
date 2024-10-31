import React from 'react'
import './css/invite.css';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Emptable from '../components/emptable';
import Search from '../components/search';


function invite() {
  return (
    <div className='background'>
      <Sidebar/>
      <h2 className="header_design text_container_d">Invite Users</h2>
      <Emptable/>
      <h3 className=''>Enter User Email: </h3>
      <div className='search'><Search/></div>
    </div>
  )
}

export default invite
