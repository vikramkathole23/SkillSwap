import React, { use } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import server from "../../../production";


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
  }
  
   const handleSubmit = async (e) => {
       e.preventDefault();
       const {email,password} = formData;
       if (!email || !password) {
         return toast.error("All field are required!")
       }
       try {
         // const api = "http://localhost:3000/user/signup";
         const res = await axios.post(
         `${server}/user/login`,
         formData,
         {
           headers: {
             "Content-Type":"application/json"
           }
         }
       );
         const {success,message,error,jwtToken,user} = res.data;
         if (success) {
          toast.success(message);
          localStorage.setItem('token' , jwtToken)
          localStorage.setItem("user", JSON.stringify( user));

          setTimeout(() => {
            navigate("/home");
          }, 1000);  

         } else if (error) {
          console.log(error);
          
           const details = error?.details[0].message;
           toast.error(details)
         } else if (!success) {
           toast.error(message)
         }
       } catch (error) {
          toast.error( error.response?.data?.message 
           || error.response?.data?.error?.details?.[0]?.message
           || "Something went wrong.")
       }
       
       
     }

  //  const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:3000/user/login",formData);
  //     console.log(res);
      
  //       navigate("/home", { state: { msg: "User login successfully! 🎉" }, replace: true });
  //     toast.success("User login successfully! ");
  //   } catch (error) {
  //     if (error.response?.status === 409) {
  //     navigate("/login", { state: { msg: error.response?.message }, replace: true });
  //     console.log(error);
      
  //     toast.success( error.response.data.message );
  //     }else{
  //       setError("Unexpected error. Please try again later.")
  //     }
  //     // console.log(error);
  //   }
  // }
 
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
