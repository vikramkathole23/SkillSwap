import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabButton from "./TabButton";
import NotesShowcase from "./notesShowCase";
const skillsData = {
  learn: [
    {
      username: "dev_ninja21",
      skill: "JavaScript",
      description: "Turns coffee into interactive web pages like magic.",
    },
    {
      username: "react_ruler",
      skill: "React.js",
      description:
        "Makes building UIs so smooth, you’ll feel like a frontend wizard.",
    },
  ],
  teach: [
    {
      username: "pixel_perfect",
      skill: "UI/UX Design",
      description:
        "Crafting screens that make users go ‘woah’ instead of ‘ugh’.",
    },
  ],
};

const SkillBox = ({ username, skill, description }) => {
  return (
    <div className="card">
      <h2 className="skill">{skill}</h2>
      <p className="user">@{username}</p>
      <p className="desc">{description}</p>
    </div>
  );
};

export default function SwapPage() {
  const [tab, setTab] = useState("incoming");
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="page">
        <h1 className="title">Skill Swap Board</h1>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChange} aria-label="Skill Tabs">
                <Tab value="1" label={<TabButton label="I Learned" />} />
                <Tab value="2" label={<TabButton label="I Taught" />} />
                <Tab value="3" label={<TabButton label="Notes" />} />
                
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="grid">
                {skillsData.learn.map((item, idx) => (
                  <SkillBox
                    key={idx}
                    username={item.username}
                    skill={item.skill}
                    description={item.description}
                    tab={tab}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="grid">
                {skillsData.teach.map((item, idx) => (
                  <SkillBox
                    key={idx}
                    username={item.username}
                    skill={item.skill}
                    description={item.description}
                    tab={tab}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <NotesShowcase/>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
