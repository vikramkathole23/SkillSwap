import React from "react";
import Button from "@mui/material/Button";

function LoginPage() {
  return (
    <>
      <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col text-center my-10 w-[400px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Join SkillSwap</h1>
          <p className="text-gray-400 text-sm mb-6">
            Learn new skills or share your expertise with a global community.
          </p>

          <div className="Login-formcontainer text-start w-full">
            <form action="">
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
