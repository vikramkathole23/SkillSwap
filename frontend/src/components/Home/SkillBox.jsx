import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SkillDialogBox from "./SkillDialogBox";
import { typographyClasses } from "@mui/material/Typography";
import toast from "react-hot-toast";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


function SkillBox({ data ,sceleton  }){

  const [open, setOpen] = React.useState(false);
  const [skillData,setskillData] =useState({})
  const navigate=useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
    
  };
  const handleClose = () => {
    setOpen(false);
  };


  const fetchSkill = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/skill/${data._id}`);
      setskillData(res.data)
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }

const deleteSkill = async () => {
  try {
    const res = await axios.delete(`http://localhost:3000/skill/${data._id}`);
    console.log(res.data);
    navigate("/home", { state: { msg: "Skill updated successfully! 🎉" }, replace: true });
    toast.success("Skill Deleted successfully!");
  } catch (error) {
    console.log("deletion error:",error)
  }
}

  return (
    <>
    {data ?
      <>
        <SkillDialogBox handleClose={handleClose} isOpen={open} data={skillData}/>
        <div className="box-container my-4">
          <div className="inner-container flex justify-between ">
            <div className="description ">
              <div className="flex text-center username mb-2">
                <span className="cursor-pointer">
                  <p>
                    <Link to={`/home/:${data._id}`}>
                      <Avatar
                        sx={{ width: 30, height: 30 }}
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                      />
                    </Link>
                  </p>
                </span>
                <span className="text-center ml-2 cursor-pointer hover:text-red-700">
                  {" "}
                  {data.username || <Skeleton count={10} />}
                </span>
              </div>
              <h1 onClick={()=>{fetchSkill();handleClickOpen();}} className="text-2xl mb-2 cursor-pointer">{data.skillName}</h1>
              <p>{data.description}</p>
              <div className="mt-[20px] ">
                <button className="box-btn px-4 py-1 ">Request Swap</button>
                <button onClick={()=>{deleteSkill()}} className="box-btn px-4 py-1 ml-4">Delete Skill</button>
                <Link to={`/skill/${data._id}/update`}><button className="box-btn px-4 py-1 ml-4">Update Skill</button></Link>
              </div>
            </div>
            <div className="Box-image h-[200px]">
              <img
                className="h-full "
                src="https://framerusercontent.com/images/0YHMW01oxIdRY4oW3VsdPXOL8xQ.jpg "
                alt="img"
              />
            </div>
          </div>
        </div>
      </>
      :  <Skeleton variant="rectangular" width={210} height={118} />
    }
    </>
  );
}

export default SkillBox;
