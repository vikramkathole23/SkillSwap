import React, { useEffect, useState } from "react";
// import "./navbarStyle.module.css"
// import { FaSearch } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import { FaRegBell } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { FaBars } from "react-icons/fa";
import { Pointer } from "lucide-react";
import NavbarManu from "./navbarMenu";

function Navbar() {
  const [selectedlink, setselectedlink] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const token = localStorage.getItem("token");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlenavbarManuClose = () => {
    setIsOpen(!isOpen);
  };

  const scheduleAutoLogout = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const { exp } = jwtDecode(token);
    const timeLeft = exp * 1000 - Date.now();

    setTimeout(() => logout(navigate), timeLeft);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUser");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    scheduleAutoLogout();
  }, []);

  const handleselectedlinks = (idx) => {
    setselectedlink(idx);
  };

  const handlenavbarManuOpen = () => {
    setIsOpen(!isOpen);
  };
  const selected = "selected";
  return (
    <>
      <nav className="max-w-full">
        <div className="nav-container sticky z-50 top-0 border-b border-white flex items-center justify-between h-[65px] px-[20px]">
          <div>
            <Link to="/" onClick={() => handleselectedlinks(0)}>
              <h1 className="brand-Name text-3xl cursor-pointer">SkillSwap</h1>
            </Link>
          </div>
          <div className="mobileView flex gap-8 items-center">
            <ul className={"webView"}>
              <Link to="/" onClick={() => handleselectedlinks(0)}>
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
          <div className="nav-right flex justify-center items-center gap-8">
            <div className="notification-box h-[40px] w-[40px] flex items-center justify-center cursor-pointer text-2xl">
              <FaRegBell />
            </div>
            <div className=" cursor-pointer">
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
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <Link to="/main/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/main/my-sessions">
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Link>
                {!token ? (
                  <>
                    <Link to="/signup">
                      <MenuItem onClick={handleClose}>Signup</MenuItem>
                    </Link>
                    <Link to="/login">
                      <MenuItem onClick={handleClose}>Login</MenuItem>
                    </Link>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </>
                )}
              </Menu>
              {/* <Link to="/main" onClick={()=>handleselectedlinks(4)}><p className={selectedlink==4?selected:""}><Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /></p> </Link> */}{" "}
            </div>
          </div>
          <div className="mobile-view-button flex ">
            <button onClick={handlenavbarManuOpen}>
              <FaBars size={30} />
            </button>
            {isOpen && (
              <NavbarManu isOpen={isOpen} handleClose={handlenavbarManuClose} logout={logout} />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
