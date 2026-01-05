import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import RequestCard from "./requestCart";
import TabButton from "../MySwap/TabButton";
import axios from "axios";
import toast from "react-hot-toast";
import server from "../../../production";

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
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [regected, setRegected] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return toast.error("you are not login!");
      }
      try {
        const res = await axios.get(
          `${server}user/requests/${user._id}`
        );

        const data = res.data;

        const p = [];
        const a = [];
        const r = [];

        data.forEach((req) => {
          if (req.status === "pending") {
            p.push(req);
          } else if (req.status === "accepted") {
            a.push(req);
          } else {
            r.push(req);
          }
        });
        setPending(p);
        setAccepted(a);
        setRegected(r);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchData();
  }, []);

  const handleAccept = async (requestId, selectedDate, status) => {
    try {
      // if (status==="accepted") {
      //   return toast.error("You already send Request!")
      // }
      // console.log(selectedDate,requestId);
      // console.log(status);
      const token = localStorage.getItem("token");
      if (!token) {
        return toast.error("you are not login!");
      }
      console.log(accepted);
      

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (!selectedDate) {
        return toast.error("please select Time and Date");
      }

      const stringDate = selectedDate.toISOString();
      const data = {
        status: "accepted",
        stringDate,
      };
      const res = await axios.patch(
        `${server}/skill/swap/send/${requestId}`,
        data,
        config
      );
      console.log(res);

      toast.success("request accepted!");
    } catch (error) {
      console.error("Error fetching skills:", error.response);
      toast.success(error.response.data);
    }
  };
  const handleReject = async (requestId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.error("you are not login!");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = { status: "rejected" };

      await axios.patch(
        `${server}/skill/swap/send/${requestId}`,
        data,
        config
      );

      toast.success("request rejected!");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
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
                <Tab value="1" label={<TabButton label="pending" />} />
                <Tab value="2" label={<TabButton label="Incoming" />} />
                <Tab value="3" label={<TabButton label="Rejected" />} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="Skill-section flex flex-wrap gap-3 mt-4 ">
                {pending?.map((req) => (
                  <RequestCard
                    key={req._id}
                    data={req}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div className="Skill-section flex flex-wrap gap-3 mt-4 ">
                {accepted?.map((req) => (
                  <RequestCard
                    key={req._id}
                    data={req}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div className="Skill-section flex flex-wrap gap-3 mt-4 ">
                {regected?.map((req) => (
                  <RequestCard key={req._id} data={req} />
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
