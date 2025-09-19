import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


function LoginPage() {
  const navigate=useNavigate();
  const [error, setError] = useState(""); 
  const [formData,setFormData]=useState({
  })

  const handleOnChangeEvent = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // console.log(formData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/user/login",formData, { withCredentials: true })
      .then((res => {
      if (res.data.success) {
         // save user in localStorage
         localStorage.setItem("user", JSON.stringify(res.data.userObj));
         console.log("User saved:", res.data.userObj);
      }   
      }))
      navigate("/home", { state: { msg: "User Login successfully! 🎉" }, replace: true });
      toast.success("User Login successfully! 🎉");
    } catch (error) {
      if (error.response?.status === 409) {
      navigate("/login", { state: { msg: error.response?.message }, replace: true });
      toast.success("Incorrect password or email!");
      }else{
        setError("Unexpected error. Please try again later.")
      }
  }
}
  return (
    <>
      <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col text-center my-10 w-[400px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Join SkillSwap</h1>
          <p className="text-gray-400 text-sm mb-6">
            Learn new skills or share your expertise with a global community.
          </p>

          <div className="Login-formcontainer text-start w-full">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Email :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleOnChangeEvent}
                placeholder="Enter your Email"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />

              {/* Password */}
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Password :
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleOnChangeEvent}
                placeholder="Enter your Password"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />

              {/* Button */}
              <button
                type="submit"
                className="w-full px-3 py-2 mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  }


export default LoginPage;
