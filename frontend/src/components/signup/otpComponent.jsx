import React, { useState } from "react";
import ReactCodeInput from "@mikesha/react-verification-code-input";
import axios from "axios";
import server from "../../../production";
// import VerificationInput from "react-verification-input";

// function otpComponent() {
//     const [otp,setOtp]=useState('')

//     const handleSubmit = ()=>{

//     }

//   return (
//     <>
//       <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
//         <div className="flex flex-col text-center my-10 w-[500px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
//           <h1 className="text-3xl font-bold text-white mb-4">Varify Email</h1>

//           <div className="Login-formcontainer text-start w-full">
//             <form action="">
//               <VerificationInput
//                 classNames={{
//                   container: "container",
//                   character: "character",
//                   characterInactive: "character--inactive",
//                   characterSelected: "character--selected",
//                   characterFilled: "character--filled",
//                 }}
//                 length={4}
//                 onChange={()=>}
//               />
//               <button
//                 type="submit"
//                 className="w-full px-3 py-2 mt-6 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
//               >
//                 verify
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default otpComponent;

function OTPVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleComplete = async (code) => {
    setLoading(true);
    setError("");
    console.log(code)
    try {
      // Example API call
      const response = await  axios.post(`${server}/user/signup/verify-otp`,
      code,
       { withCredentials: true }
    );
      if (response.success) {
        // Navigate to next screen or show success
      } else {
        setError("Invalid verification code");
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const resetCode = ( ) =>{

  }

  return (
    <div className="otp-form">
      <h2>Verify Your Account</h2>
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

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default OTPVerification;
