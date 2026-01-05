import React, { useCookies, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import server from "../../../production";

function AddNewSkill() {
  const navigate = useNavigate();
  // const user = localStorage.getItem("loginUser");
  // const user = JSON.parse(localStorage.getItem("loginUser"));
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user) {
    return <p>User not logged in</p>;
  }
  console.log(user);

  const [formData, setFormData] = useState({
    user: user._id,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, // keep previous data
      [e.target.name]: e.target.value, // add new data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not Logged in! Please Login First");
        return navigate("/login");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post(
        `${server}/skill/newskill`,
        formData,
        config
      );
      console.log(res);
      navigate("/home", {
        state: { msg: "Skill updated successfully!" },
        replace: true,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log("new post request:", error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      {/* <h1>Add New Skill</h1> */}
      <div class="min-h-screen  py-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div class="bg-gray-800 shadow-xl my-10 rounded-2xl p-8 w-full max-w-2xl">
          <h1 class="text-4xl font-bold text-white mb-6 text-center">
            Add New Skill
          </h1>

          <form
            action=""
            method="POST"
            encType="multipart/form-data"
            class="space-y-5"
            onSubmit={handleSubmit}
          >
            {/* <!-- Skill Name --> */}
            <div>
              <label for="skillName" class="block text-gray-300 mb-2">
                What's you want to Teach?
              </label>
              <input
                type="text"
                id="skillName"
                name="skillName"
                value={formData.skillName}
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* <!-- Image Upload --> */}
            <div>
              <label for="URL" class="block text-gray-300 mb-2">
                Skill URL:
              </label>
              <input
                type="text"
                id="URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* <!-- Description --> */}
            <div>
              <label for="description" class="block text-gray-300 mb-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              ></textarea>
            </div>

            {/* <!-- Profession --> */}
            <div>
              <label for="profession" class="block text-gray-300 mb-2">
                What is your profession?
              </label>
              <select
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select Profession --</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Teacher">Teacher</option>
                <option value="Engineer">Engineer</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* <!-- Proficiency Level --> */}
            <div>
              <label for="proficiency" class="block text-gray-300 mb-2">
                Proficiency Level:
              </label>
              <select
                id="proficiency"
                name="proficiency"
                value={formData.proficiency}
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select Level --</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            {/* <!-- Category --> */}
            <div>
              <label for="category" class="block text-gray-300 mb-2">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">-- Select Category --</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Music">Music</option>
                <option value="Photography">Photography</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* <!-- Submit --> */}
            <div class="text-center">
              <button
                type="submit"
                // onClick={(e)=>{
                //   sendData(e)
                // }}
                class="px-10 w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
              >
                Add Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddNewSkill;
