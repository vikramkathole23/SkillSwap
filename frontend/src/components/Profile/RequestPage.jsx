import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RequestCard from "./Cart";
import TabButton from "../MySwap/TabButton";

const requestsData = {
  accepted: [
    {
      name: "Ethan",
      topic: "Advanced UI Design Techniques",
      date: "Tuesday, July 23, 2024",
      time: "10:00 AM – 11:00 AM",
      status: "Accepted",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
  ],
  pending: [
    {
      name: "Olivia",
      topic: "Agile Project Management",
      date: "Wednesday, July 24, 2024",
      time: "2:00 PM – 3:00 PM",
      status: "Pending",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  ],
  rejected: [
    {
      name: "Noah",
      topic: "Data Visualization Best Practices",
      date: "Thursday, July 25, 2024",
      time: "4:00 PM – 5:00 PM",
      status: "Rejected",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ],
};

function MySessionsPage() {
    const [tab, setTab] = useState("incoming");
      const [value, setValue] = useState("1");
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
  
    return ( 
        <div className="p-8">
       <h1 className="text-2xl font-bold">Requests</h1>
        <p className="text-gray-400 mb-4">
          Manage your incoming and outgoing requests
        </p>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-700 mb-6">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="Skill Tabs">
                  <Tab value="1" label={<TabButton label="Incoming" />}  />
                  <Tab value="2" label={<TabButton label="Pending" />} />
                  <Tab value="3"  label={<TabButton label="Rejected" />}/>
                </TabList>
              </Box>
              <TabPanel value="1">
                <div className="Skill-section flex flex-wrap gap-3 mt-4">
                  {requestsData.accepted.map((req, i) => (
                    <RequestCard key={i} data={req} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div className="Skill-section flex flex-wrap gap-3 mt-4">
                  {requestsData.pending.map((req, i) => (
                    <RequestCard key={i} data={req} />
                  ))}
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div className="Skill-section flex flex-wrap gap-3 mt-4">
                  {requestsData.rejected.map((req, i) => (
                    <RequestCard key={i} data={req} />
                  ))}
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div> 
        </div>
     );
}

export default MySessionsPage;