import React from 'react';
import SkillBox from './SkillBox';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from 'axios';
import toast from 'react-hot-toast';
import { socket } from '../socket';
import  server from '../../../production.js'



function HomePage() {
  const [data, setData] = useState([]);
  const [sceleton,setSceleton]=useState("false")
  const navigate=useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  
  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     if (!cookies.token) {
  //       navigate("/login");
  //     }
  //     const { data } = await axios.post(
  //       "http://localhost:3000",
  //       {},
  //       { withCredentials: true }
  //     );
  //     const { status, user } = data;
  //     setUsername(user);
  //     return status
  //       ? toast(`Hello ${user}`, {
  //           position: "top-right",
  //         })
  //       : (removeCookie("token"), navigate("/login"));
  //   };
  //   verifyCookie();
  // }, [cookies, navigate, removeCookie]);
  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/signup");
  // };
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${server}/skill`);
      setData(res.data);
      // console.log(server);      
      setSceleton("true")
    } catch (err) {
      console.error("Error fetching skills:", err);
    }
  };
  fetchData();
  }, []);

  useEffect(()=>{
    socket.connect();
    const user = JSON.parse(localStorage.getItem("user"))
    if (user?._id) {
    socket.emit("register", user._id);
  }

  socket.on("new_request", (data) => {
    console.log("Notification received:", data);
    toast.success(data?.message);
  });
  },[])

    return ( 
        <>
           <div className="home-container mx-[10%] p-2 ">
              <div className="search-category-container">
              </div>
              <div className="Skill-Conyainer mt-8">
              <h1 className='text-3xl font-semibold mb-6'>Skills Available</h1>
               {data.map((item,idx)=>(
                  <SkillBox data={item} key={idx} id={item.id} sceleton={sceleton}/>
               ))}
               </div>
           </div>
        </>
     );
}

export default HomePage;