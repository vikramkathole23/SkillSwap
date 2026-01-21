import React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Rating from "@mui/material/Rating";
import server from "../../../production";
import axios from "axios";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";


function UserProfileDetail() {
  const [value, setValue] = useState("1");
  const user = JSON.parse(localStorage.getItem("user"));
  const [existUser, setExistUser] = useState();
  const [formData,setFormData]= useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getExistUserDetail = async () => {
    try {
      const res = await axios.get(`${server}/user/${user._id}`);
      setExistUser(res.data.user);
      console.log(existUser)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getExistUserDetail();
  },[])


  const editUserDeteil = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${server}/user/${id}`,
        formData,
        config
      );
      console.log(res);
      navigate("/", {
        state: { msg: "Skill updated successfully!" },
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="ProfilePage-container mx-[10%] flex flex-col mb-12 text-white">
        {/* Avatar + Name */}
        <div className="Avatar-box flex flex-col items-center mt-8 gap-2">
          <Avatar
            alt={existUser?existUser.fullName:""}
            src="/static/images/avatar/2.jpg"
            sx={{ width: 50, height: 50 }}
          />
          {
            existUser ? (
              <>
                <h1 className="text-2xl font-semibold mt-2">{existUser.fullName}</h1>
                <p className="text-gray-400">{existUser.profession}</p>
              </>
            ) : (
              <>
                <Skeleton height={20}/>
                <Skeleton height={20}/>
              </>
            )
          }
          {/* <h1 className="text-2xl font-semibold mt-2">{existUser.name}</h1> */}
          {/* <p className="text-gray-400">{existUser.profesion}</p> */}
          {/* <p className="text-gray-500 text-sm">Joined in 2021</p> */}
          <Link to="/main/edituserdeteil">
          <button
            className="mt-3 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition duration-300"
          >
            Edit Profile
          </button>
          </Link>
        </div>

        {/* About Me */}
        <div className="User-detail my-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-2xl mb-3 font-medium">About Me</h1>
          {
            existUser?<p className="text-gray-300">
            {existUser.about_me}
          </p>:<>
                <Skeleton height={15}/>
                <Skeleton height={15}/>
                <Skeleton height={15}/>
              </>
          }
          
        </div>

        {/* Skills */}
        <h1 className="text-2xl mt-8 mb-2 font-medium">Skills</h1>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Skill Tabs">
                <Tab label="Teaching" value="1" />
                <Tab label="Learning" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="Skill-section flex flex-wrap gap-3 mt-4">
                {["Web Development", "JavaScript", "React"].map((skill) => (
                  <div key={skill} className="Skills text-white px-4 py-2   ">
                    {skill}
                  </div>
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="Skill-section flex flex-wrap gap-3 mt-4">
                {["AI/ML", "Machine Learning", "Python"].map((skill) => (
                  <div key={skill} className=" px-4 py-2 Skills">
                    {skill}
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>

        {/* Rating Section */}
        <div className="rating-section mt-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-2xl font-medium">Rating & Badges</h1>
          <div className="mt-4">
            <h1 className="text-4xl font-bold text-red-400">4.8</h1>
            <Rating name="read-only" value={4.8} precision={0.1} readOnly />
            <p className="text-gray-400 mt-1">125 reviews</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfileDetail;
