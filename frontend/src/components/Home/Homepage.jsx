import React from "react";
import SkillBox from "./SkillBox";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { socket } from "../socket";
import server from "../../../production.js";
// import cardSkeleton from './CardSkelaton.jsx';
import SkillBoxSkeleton from "./CardSkelaton.jsx";

function HomePage() {
  const [data, setData] = useState([]);
  const [sceleton, setSceleton] = useState("false");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${server}/skill`);
        setData(res.data);
        console.log(res);
        if (data) {
          setSceleton("true");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // socket.connect();
    const user = JSON.parse(localStorage.getItem("user"));
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      if (user?._id) {
        socket.emit("register", user._id);
      }
      // console.log(user);

      socket.on("new_request", (data) => {
        console.log("Notification received:", data);
        toast.success(data?.message);
      });
      // return () => {
      //   socket.off("new_request");
      //   socket.off("connect");
      // };
    });
  }, []);

  return (
    <>
      <div className="home-container">
        <div className="search-category-container">
          {/* search + category filters */}
        </div>

        <div className="skill-container w-100%">
          {/* <h1 className="skill-title">Skills Available</h1> */}

          {sceleton === "false" && (
            <div className="skill-grid m-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkillBoxSkeleton key={index} />
              ))}
            </div>
          )}

          <div className="skill-grid mx-14">
            {data.map((item, idx) => (
              <SkillBox
                data={item}
                key={idx}
                id={item.id}
                sceleton={sceleton}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
