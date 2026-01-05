import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import server from "../../../production";


function SignUpPage() {
  const navigate=useNavigate();
  const [error,setError] = useState()
  const [formData,setFormData] = useState({
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
    const {fullName,email,password} = formData;
    if (!fullName || !email || !password) {
      return toast.error("All field are required!")
    }
    try {
      // const api = "http://localhost:3000/user/signup";
      const res = await axios.post(
      `${server}/user/signup`,
      formData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
      const {success,message,error} = res.data;
      console.log(res);
      
      if (success) {
        toast.success(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } 
    } catch (error) {
      if (error.response && error.response.status === 409) {
         toast.error("This email is already registered. please log in instead.")
      } else {
        toast.error("something went wrong. please try again. ")
      }
      
    }
    
    
  }
  return (
    <>
      <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col text-center my-10 w-[500px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">Join SkillSwap</h1>

          <div className="Login-formcontainer text-start w-full">
            <form action="" onSubmit={handleSubmit}>
              {/* Full Name */}
              <label
                htmlFor="fullname"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                onChange={handleOnChangeEvent}
                name="fullName"
                placeholder="Enter your Full Name"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Email */}
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                onChange={handleOnChangeEvent}
                name="email"
                placeholder="Enter your Email"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Password */}
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                onChange={handleOnChangeEvent}
                name="password"
                placeholder="Enter your Password"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              {/* Confirm Password */}
              {/* <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="p"
                placeholder="Confirm your Password"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              /> */}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-3 py-2 mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
