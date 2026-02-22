import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import server from "../../../production";

const AddNotesAndAssignmentForm = () => {
  const [file, setFile] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const storedUser = localStorage.getItem("user");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subject: "",
    type: "notes",
    deadline: "",
  });
  const user = storedUser ? JSON.parse(storedUser) : null;
  if (!user) {
    return <p>User not logged in</p>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreviewName(selected?.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return toast.error("Please upload a file");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("subject", formData.subject);
    data.append("type", formData.type);
    data.append("deadline", formData.deadline);
    data.append("user", user._id)
    data.append("file", file);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You are not Logged in! Please Login First");
        return navigate("/login");
      }
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const fileUpload = await axios.post(`${server}/skill/studymaterial/upaload`, data, config);
       console.log(fileUpload);
       console.log(data);
       
       
      toast.success("Uploaded successfully ");
    } catch (error) {
        console.log(error);
        
      toast.error("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="bg-gray-800 w-full max-w-2xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">
          Upload Note / Assignment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
          />

          <select
            name="type"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
          >
            <option value="notes">Note</option>
            <option value="assignment">Assignment</option>
          </select>

          {formData.type === "assignment" && (
            <input
              type="date"
              name="deadline"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-600"
            />
          )}

          <div className="border border-dashed border-gray-500 p-6 rounded-lg text-center text-gray-400">
            <input type="file" onChange={handleFileChange} />
            {previewName && (
              <p className="mt-2 text-green-400">{previewName}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 p-3 rounded-lg text-white font-semibold"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotesAndAssignmentForm;
