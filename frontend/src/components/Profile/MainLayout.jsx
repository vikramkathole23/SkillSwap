// import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  const [selectedlink, setselectedlink] = useState(1);
  const user= JSON.parse(localStorage.getItem("user"));
  const handleSelectlink = (idx) => {
    setselectedlink(idx);

  };
  const selected = " selected";

  return (
    <div className="profile-main flex bg-[#21364A] w-full fixed  top-[60px]  min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-5 space-y-6">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            className="w-12 h-12 rounded-full"
            alt="profile"
          />
          <div className="main-user-name">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-400">Product Designer</p>
          </div>
        </div>
        <nav className="space-y-3">
          <ul className="text-start layout-links">
            {/* <Link to="/home"onClick={()=>handleSelectlink(o)}> */}
               
              {/* <p className={selectedlink === 0 ? selected : ""}>Home</p> */}
            {/* </Link> */}
            <Link to="/main/my-sessions"onClick={()=>handleSelectlink(1)}>
              
              <p className={selectedlink === 1 ? selected : ""}>My Sessions</p>
            </Link>
            <Link to="/main/profile"onClick={()=>handleSelectlink(2)}>
            
              <p className={selectedlink === 2 ? selected : ""}>Profile</p>
            </Link>
            <Link to="/main/addnewskill"onClick={()=>handleSelectlink(3)}>
            
              {/* <p className={selectedlink === 3 ? selected : ""}>Add New Skills</p> */}
            </Link>
            {/* <Link to="/home"><li className="aside-links links">Settings</li></Link> */}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1   h-[100vh]">
        <div className="h-[100%] overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
