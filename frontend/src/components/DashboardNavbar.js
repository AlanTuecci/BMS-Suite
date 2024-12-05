import React from 'react'
import { Link, useNavigate } from "react-router-dom";



function DashboardNavbar() {
    return (
      <header class="flex flex-wrap md:flex-nowrap z-50 w-full py-7">
          <nav class='relative max-w-7xl w-full grid md:grid-cols-12 items-center px-4 md:px-6 md:px-8 mx-auto'>
              {/* Logo */}
              <div class="md:col-span-3 flex text-3xl justify-start items-center font-bold">
                  BMS Suite
              </div>
  
              {/* Navigation Links */}
              <div class="hidden md:flex md:col-span-6 justify-center items-center">
                  <ul class="flex gap-7">
                  <li class="relative py-2 px-2 inline-block text-black ">
                      <Link to="/">Home</Link>
                  </li>
                  <li class="relative py-2 px-2 inline-block text-black ">
                      <Link to="/">About</Link>
                  </li>
                  <li class="relative py-2 px-2 inline-block text-black ">
                      <Link to="/">Feature</Link>
                  </li>
                  <li class="relative py-2 px-2 inline-block text-black ">
                      <Link to="/">Contact</Link>
                  </li>
                  </ul>
              </div>
  
              <div class="flex items-center gap-x-2 justify-end md:col-span-3">
                  <button class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-3xl bg-compblue border border-compblue text-bkgd hover:shadow-2xl hover:shadow-dashboard_shadow hover:scale-105">
                  Log Out
                  </button>
              </div>
              
          </nav>
      </header>
    )
  }
  
  export default DashboardNavbar
  