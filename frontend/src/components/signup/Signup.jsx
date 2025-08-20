import React from 'react';

function SignUpPage() {
    return ( 
        <>
           <div className="Login-container flex justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
  <div className="flex flex-col text-center my-10 w-[500px] items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-lg">
    <h1 className="text-3xl font-bold text-white mb-4">Join SkillSwap</h1>

    <div className="Login-formcontainer text-start w-full">
      <form action="">
        
        {/* Full Name */}
        <label htmlFor="fullname" className="block mb-1 text-sm font-medium text-gray-300 mt-4">Full Name:</label>
        <input
          type="text"
          id="fullname"
          placeholder="Enter your Full Name"
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Email */}
        <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-300 mt-4">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your Email"
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Password */}
        <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-300 mt-4">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your Password"
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-gray-300 mt-4">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm your Password"
          className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

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