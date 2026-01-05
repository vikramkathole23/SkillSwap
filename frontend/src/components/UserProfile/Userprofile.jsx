import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import SkillBox from "../Home/SkillBox";
import UserSkill from "./userSkill";
import server from "../../../production";

function UserProfile() {
  const [value, setValue] = useState("1");
  const [data, setData] = useState(null);
  const { id } = useParams();

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${server}/user/${id}`);
        setData(res.data.userObj);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <>{data?
      <div className="ProfilePage-container mx-[10%] flex flex-col mb-12 text-white">
        {/* Avatar + Name */}
        <div className="Avatar-box flex flex-col items-center mt-8 gap-2">
          <Avatar
            alt="Olivia Carter"
            src="/static/images/avatar/2.jpg"
            sx={{ width: 100, height: 100 }}
          />
          <h1 className="text-2xl font-semibold mt-2">{data.fullName}</h1>
          <p className="text-gray-400">Software Engineer</p>
          <p className="text-gray-500 text-sm">Joined in 2021</p>
        </div>

        {/* About Me */}
        <div className="User-detail my-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <h1 className="text-2xl mb-3 font-medium">About Me</h1>
          <p className="text-gray-300">
            I'm a software engineer with a passion for teaching and learning new
            skills. I specialize in web development and enjoy sharing my
            knowledge with others.
          </p>
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
                {/* <UserSkill/> */}
                {data.skills.map((skill) => (
            <div
              key={skill}
              className="Skills text-white px-4 py-2   "
            >
              {skill}
            </div>
          ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="Skill-section flex flex-wrap gap-3 mt-4">
                {/* {["AI/ML", "Machine Learning", "Python"].map((skill) => (
            <div
              key={skill}
              className=" px-4 py-2 Skills"
            >
              {skill}
            </div>
          ))} */}
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
      </div>:"no data yet"}
    </>
  );
}

export default UserProfile;
