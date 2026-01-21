import axios from "axios";
import React, { useEffect, useState } from "react";
import { replace, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import SkillDialogBox from "./SkillDialogBox";
import toast from "react-hot-toast";
import server from "../../../production";
// import { set } from "mongoose";

function EditUserDeteil() {
  const user = JSON.parse(localStorage.getItem("user")); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    profile_pic: "",
    about_me: "",
    profession: "",
    // proficiency: "",
    category: "",
    user_id:user._id
  }); 
  const { id } = useParams();

//   useEffect(() => {
//     const fetchSkillData = async () => {
//       try {
//         const res = await axios.get(`${server}skill/${id}`);
//         setskillData(res.data);
//         //   console.log(Data.data);
//       } catch (error) {
//         console.log("fetchSkill data error:", error);
//       }
//     };
//     fetchSkillData();
//   }, [id]);

  const handleChange = (e) => {
    setUserData({
      ...userData, // keep previous data
      [e.target.name]: e.target.value, // add new data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const responce = await axios.patch(
        `${server}/user/${user._id}`,
        userData,
        config,
      );
      console.log(userData);
      
      // redirect when skill is updated successfully
    //   navigate("/", {
    //     state: { msg: "user updated successfully!" },
    //     replace: true,
    //   });
    //   toast.success("Skill Updated successfully!");
    } catch (error) {
      console.log("Request URL:", error.config.url);
      console.log("HTTP Method:", error.config.method);
      console.log("Status Code:", error.response.status);
      console.log(error);

      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div class="min-h-screen  py-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
        <div class="bg-gray-800 shadow-xl my-10 rounded-2xl p-8 w-full max-w-2xl">
          <h1 class="text-4xl font-bold text-white mb-6 text-center">
            Edit User Deteil
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
              <label for="fullName" class="block text-gray-300 mb-2">
                Edit Name of User
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={userData.fullName }
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* <!-- Image Upload --> */}
            <div>
              <label for="profile_pic" class="block text-gray-300 mb-2">
                Profile Pic:
              </label>
              <input
                type="text"
                id="profile_pic"
                name="profile_pic"
                value={userData.profile_pic }
                onChange={handleChange}
                required
                class="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 text-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            {/* <!-- Description --> */}
            <div>
              <label for="about_me" class="block text-gray-300 mb-2">
                About Me:
              </label>
              <textarea
                id="about_me"
                name="about_me"
                value={userData.about_me }
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
                value={userData.profession}
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
            {/* <div>
              <label for="proficiency" class="block text-gray-300 mb-2">
                Proficiency Level:
              </label>
              <select
                id="proficiency"
                name="proficiency"
                value={userData.proficiency || ""}
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
            </div> */}

            {/* <!-- Category --> */}
            <div>
              <label for="category" class="block text-gray-300 mb-2">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={userData.category}
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
                class="px-10 w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300 ease-in-out"
              >
                Edit User Deteil
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditUserDeteil;
