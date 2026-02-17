import React from "react";
import { useEffect,useState } from "react";
import User from "./User.jsx";
import axios from "axios";

// import useGetAllUsers from "../../../context/useGetAllUsers.jsx";

const allUsers = [
  { id: 1, name: "Aarav Mehta" },
  { id: 2, name: "Riya Sharma" },
  { id: 3, name: "Kabir Singh" },
  { id: 4, name: "Sneha Patil" },
  { id: 5, name: "Arjun Deshmukh" },
  { id: 6, name: "Neha Verma" },
  { id: 7, name: "Yash Kulkarni" },
  { id: 8, name: "Ananya Gupta" },
  { id: 9, name: "Rohan Joshi" },
  { id: 10, name: "Priya Nair" },
  { id: 11, name: "Aarav Mehta" },
  { id: 12, name: "Riya Sharma" },
  { id: 13, name: "Kabir Singh" },
  { id: 14, name: "Sneha Patil" },
  { id: 15, name: "Arjun Deshmukh" },
  { id: 16, name: "Neha Verma" },
  { id: 17, name: "Yash Kulkarni" },
  { id: 18, name: "Ananya Gupta" },
  { id: 19, name: "Rohan Joshi" },
  { id: 20, name: "Priya Nair" }
];





function Users() {
//   const [allUsers, loading] = useGetAllUsers();
     const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  
  // console.log(allUsers);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(100vh )" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;