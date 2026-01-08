import React, { useState } from "react";
import ReactCodeInput from "@mikesha/react-verification-code-input";
import axios from "axios";
import server from "../../../production";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";


function OTPVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email,setEmail] = useState("")
  const navigate = useNavigate();

  const handleOnChangeEvent = (e) => {
    const { name, value } = e.target;
    setEmail(value);
    console.log(value);
  }

  const handleComplete = async (code) => {
    setLoading(true);
    setError("");
    // console.log(code);
    try {
      // Example API call
      const response = await axios.post(
        `${server}/user/signup/verify-otp`,
        { email,code },
        
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      
      if (response.data.success) {
        // Navigate to next screen or show success
        toast.success(response.data.message)
        navigate("/login")
      } else {
        toast.error(response.data.message)
        setError("Invalid verification code");
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      toast.error(err.response.data.message)
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const ResendOtp =async () => {
    try {
      if (!email) {
        toast.error("Please,Enter your Register Email!")
        return;
      }
      const response = await axios.post(
        `${server}/user/signup/verify-otp/resend-otp`,
        { email },
        
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error);
    }
  }

  const resetCode = () => {};

  return (
    <>
      <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="flex flex-col text-center my-10 w-[500px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">Join SkillSwap</h1>

          <div className="Login-formcontainer text-start w-full">
              <h2>Verify Your Account</h2>
              <p>We've sent a verification code to your phone</p>

              {error && <div className="error-message">{error}</div>}

              {/* Email */}
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-300 mt-4"
              >
               Enter your registered Email:
              </label>
              <input
                type="email"
                id="email"
                onChange={handleOnChangeEvent}
                name="email"
                placeholder="Enter your Email"
                className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              
              <ReactCodeInput
                // ref={codeInputRef}..
                fields={4}
                type="number"
                // onChange={handleChange}
                onComplete={handleComplete}
                className="verification-container"
                inputClassNames="verification-input"
                placeholder="0"
              />

              <div className="form-actions">
                <button onClick={resetCode} className="mr-2 bg-green-400 rounded p-2 hover:bg-green-500">Clear</button>
                <button onClick={ResendOtp} className="mr-2 bg-red-400 rounded p-2 hover:bg-red-500">Resend Code</button>
              </div>

              {/* Submit Button */}
              {/* <button
                type="submit"
                className="w-full px-3 py-2 mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
              >
                Sign Up
              </button> */}
          </div>
        </div>
      </div>

      {/* <div className="otp-form"> */}
      {/* <h2>Verify Your Account</h2>
      <p>We've sent a verification code to your phone</p>

      <ReactCodeInput
        // ref={codeInputRef}..
        fields={4}
        type="number"
        // onChange={handleChange}
        onComplete={handleComplete}
        className="verification-container"
        inputClassNames="verification-input"
        placeholder="0"
      />

      <div className="form-actions">
        <button onClick={resetCode}>Clear</button>
        <button>Resend Code</button>
      </div>

      {error && <div className="error-message">{error}</div>} */}
      {/* </div> */}
    </>
  );
}

export default OTPVerification;
