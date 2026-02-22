import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
export default function NavbarManu({isOpen,handleClose,logout}) {
  const token = localStorage.getItem("token");
  return (
    <React.Fragment>
      <Menu
        id="skillswap-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              mt: 1.5,
              borderRadius: "12px",
              minWidth: 200,
              bgcolor: "#0f172a", 
              color: "#fff",
              boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
              "& .MuiMenuItem-root": {
                fontSize: "14px",
                gap: "10px",
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 16,
                width: 10,
                height: 10,
                bgcolor: "#0f172a",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {/* Profile */}
        <MenuItem
          component={Link}
          to="/"
          onClick={handleClose}
        >
         Home
        </MenuItem>

        <MenuItem
          component={Link}
          to="/my-swap"
          onClick={handleClose}
        >
          My Swaps
        </MenuItem>

        <MenuItem
          component={Link}
          to="/main"
          onClick={handleClose}
        >
          profile
        </MenuItem>

        <MenuItem
          component={Link}
          to="/addnewskill"
          onClick={handleClose}
        >
          Add New Skill
        </MenuItem>

        <MenuItem
          component={Link}
          to="/uploadnotes"
          onClick={handleClose}
        >
          Add Note & Assignment
        </MenuItem>

        <Divider sx={{ bgcolor: "#1e293b", my: 1 }} />

        {/* Add New Skill */}
        {/* <MenuItem
          component={Link}
          to="/addnewskill"
          onClick={props.handleClose}
        >
          Add New Skill
        </MenuItem> */}
        {/* <Link to="/addnewskill">
          <MenuItem>
            <ListItemIcon>
              <AddCircleOutlineIcon sx={{ color: "#38bdf8" }} />
            </ListItemIcon>
            Add New Skill
          </MenuItem>
        </Link> */}

        {/* Logout */}
        {!token ? (
          <>
            <MenuItem
              component={Link}
              to="/signup"
              onClick={handleClose}
            >
              Signup
            </MenuItem>
            <MenuItem
              component={Link}
              to="/login"
              onClick={handleClose}
            >
              Login
            </MenuItem>
          </>
        ) : (
          <>
             <MenuItem
              onClick={logout}
            >
              Logout
            </MenuItem>
          </>
        )}
      </Menu>
        

    </React.Fragment>
  );
}
