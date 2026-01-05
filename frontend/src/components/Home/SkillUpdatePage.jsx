import axios from "axios";
import React, { useEffect, useState } from "react";
import { replace, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SkillDialogBox from "./SkillDialogBox";
import toast from "react-hot-toast";
import server from "../../../production";

function SkillUpdatePage() {
  const navigate = useNavigate();
  const [skillData, setskillData] = useState({
    skillName: "",
    image: "",
    description: "",
    profession: "",
    proficiency: "",
    category: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        
        const res = await axios.get(`${server}skill/${id}`);
        setskillData(res.data);
        //   console.log(Data.data);
      } catch (error) {
        console.log("fetchSkill data error:", error);
      }
    };
    fetchSkillData();
  }, [id]);

  const handleChange = (e) => {
    setskillData({
      ...skillData, // keep previous data
      [e.target.name]: e.target.value, // add new data
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
        const config = {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }
      const responce = await axios.patch(
        `${server}/skill/${id}`,
        skillData,
        config
      );
      // redirect when skill is updated successfully
      navigate("/home", { state: { msg: "Skill updated successfully!" }, replace: true });
      toast.success("Skill Updated successfully!");
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
            Update Skill
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
                value={skillData.skillName || ""}
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
                value={skillData.image || ""}
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
                value={skillData.description || ""}
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
                value={skillData.profession || ""}
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
                value={skillData.proficiency || ""}
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
                value={skillData.category || ""}
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
                Update Skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SkillUpdatePage;
