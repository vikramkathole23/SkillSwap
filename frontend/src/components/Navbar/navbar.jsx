import React, { useState } from "react";
// import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from "axios";
import toast from "react-hot-toast";


function Navbar() {
  const [selectedlink, setselectedlink] = useState(0);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("loginUser");
  navigate("/login");
};

  const handleselectedlinks = (idx) => {
    setselectedlink(idx);
  };

  const selected = "selected";
  return (
    <>
      <div className="nav-container sticky z-50 top-0 border-b border-white flex justify-between h-[65px] px-[20px]">
        <div className="flex gap-8 items-center">
          <Link to="/home" onClick={() => handleselectedlinks(o)}>
            <h1 className="brand-Name text-3xl cursor-pointer">SkillSwap</h1>
          </Link>
          <ul className=" flex gap-8 items-center ">
            <Link to="/home" onClick={() => handleselectedlinks(o)}>
              <li className={selectedlink == 0 ? selected : ""}>Home</li>
            </Link>
            <Link to="/my-swap" onClick={() => handleselectedlinks(1)}>
              <li className={selectedlink == 1 ? selected : ""}>MySwap</li>
            </Link>
            <Link to="/addnewskill" onClick={() => handleselectedlinks(2)}>
              <li className={selectedlink == 2 ? selected : ""}>
                Add New Skill
              </li>
            </Link>
            {/* <li className='links'>My Swap</li> */}
            <li className="links">Messages</li>
          </ul>
        </div>
        <div className="flex justify-center items-center  gap-8">
          <div className="search ">
            <input type="text" placeholder="Search" />
          </div>
          <div className="notification-box h-[40px] w-[40px]  flex items-center justify-center cursor-pointer text-2xl">
            <FaRegBell />
          </div>
          <div className=" cursor-pointer">
            {" "}
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Link to="/main/profile"><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
              <Link to="/main/my-sessions"><MenuItem onClick={handleClose}>My account</MenuItem></Link>
              <Link to="/signup"><MenuItem onClick={handleClose}>Signup</MenuItem></Link>
              <Link to="/login"><MenuItem onClick={handleClose}>Login</MenuItem></Link>
              <MenuItem onClick={logout}>Logout</MenuItem>

            </Menu>
            {/* <Link to="/main" onClick={()=>handleselectedlinks(4)}><p className={selectedlink==4?selected:""}><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></p> </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
