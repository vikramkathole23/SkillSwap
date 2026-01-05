import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import SkillDialogBox from "./SkillDialogBox";
import { typographyClasses } from "@mui/material/Typography";
import toast from "react-hot-toast";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import skill from "../../../../backend/models/skill.model";
import server from "../../../production";

function SkillBox({ data, sceleton }) {
  const [open, setOpen] = React.useState(false);
  const [skillData, setskillData] = useState({});
  const navigate = useNavigate();
  const sender = JSON.parse( localStorage.getItem("user") )

  const handleClickOpen = () => {
    setOpen(true);
    console.log(open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchSkill = async () => {
    try {
      const res = await axios.get(`${server}/skill/${data._id}`);
      setskillData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const SendRequest = async (receiverId, skillId) => {
    try {
      // const sender = JSON.parse( localStorage.getItem("user") )
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not Logged in! Please Login First")
       return navigate("/login")
      }
      const config = {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }
      const res = await axios.post(
        `${server}/skill/swap/send`,
        {
          senderId: sender?._id,
          receiverId,
          skillId
        },
        config
      );
      toast.success("Request send successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data)
    }
  };

  const deleteSkill = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      const res = await axios.delete(
        `${server}/skill/${data._id}`,
        config
      );
      // console.log(data._id);
      navigate("/home", {
        state: { msg: "Skill deleted successfully! " },
        replace: true,
      });
      toast.success("Skill Deleted successfully!");
    } catch (error) {
      console.log("deletion error:", error);
      toast.error(error.response.data);
    }
  };

  const sendMassege = (id)=>{
    navigate(`/home/user/${id}/chat`)
  }

  return (
    <>
      {data ? (
        <>
          <SkillDialogBox
            handleClose={handleClose}
            isOpen={open}
            data={skillData}
          />
          <div className="box-container my-4">
            <div className="inner-container flex justify-between ">
              <div className="description ">
                <div className="flex text-center username mb-2">
                  <span className="cursor-pointer">
                    <p>
                      <Link to={`/home/user/${data.user?._id}`}>
                        <Avatar
                          sx={{ width: 30, height: 30 }}
                          alt={skillData.user?.fullName}
                          src="/static/images/avatar/1.jpg"
                        />
                      </Link>
                    </p>
                  </span>
                  <span className="text-center ml-2 cursor-pointer hover:text-red-700">
                    {" "}
                    {data.user?.fullName || <Skeleton count={10} />}
                  </span>
                </div>
                <h1
                  onClick={() => {
                    fetchSkill();
                    handleClickOpen();
                  }}
                  className="text-2xl mb-2 cursor-pointer"
                >
                  {data.skillName}
                </h1>
                <p>{data.description}</p>
                <div className="mt-[20px] ">
                  {
                    data.user?._id === sender?._id ? (
                      <>
                        <button
                          onClick={() => {
                            deleteSkill();
                          }}
                          className="box-btn px-4 py-1 ml-4"
                        >
                          Delete Skill
                        </button>
                        <Link to={`/skill/${data._id}/update`}>
                          <button className="box-btn px-4 py-1 ml-4">
                            Update Skill
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            SendRequest(data.user?._id, data._id);
                          }}
                          className="box-btn px-4 py-1 ml-4"
                        >
                          Request Swap
                        </button>
                        
                        <button
                          onClick={() => {
                            sendMassege(data.user?._id);
                          }}
                          className="box-btn px-4 py-1 ml-4"
                        >
                          massege
                        </button>
                      </>
                    )
                  }
                 
                  
                </div>
              </div>
              <div className="Box-image h-[200px]">
                <img
                  className="h-full "
                  src={data.image}
                  alt="img"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  );
}

export default SkillBox;
