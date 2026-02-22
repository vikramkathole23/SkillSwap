import React, { useEffect, useState } from "react";
import axios from "axios";

function NotesShowcase(){
  const [materials, setMaterials] = useState([]);
  const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const res = await axios.get("/api/material/all");
//       setMaterials(res.data.materials);
//     };
//     fetchNotes();
//   }, []);
    useEffect(() => {
  const dummyData = [
    {
      _id: "1",
      title: "Java OOP Concepts",
      description: "Complete guide to classes, objects, inheritance & polymorphism.",
      subject: "Java",
      type: "note",
      deadline: "",
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        filename: "java-oop.pdf",
        resourceType: "application/pdf",
        type: "pdf",
      },
    },
    {
      _id: "2",
      title: "DSA Assignment 1",
      description: "Solve linked list and stack problems before submission.",
      subject: "Data Structures",
      type: "assignment",
      deadline: "2026-03-15",
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        filename: "dsa-assignment.pdf",
        resourceType: "application/pdf",
        type: "pdf",
      },
    },
    {
      _id: "3",
      title: "React Hooks Notes",
      description: "useState, useEffect, useRef and custom hooks explained.",
      subject: "React",
      type: "note",
      deadline: "",
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        filename: "react-hooks.pdf",
        resourceType: "application/pdf",
        type: "pdf",
      },
    },
    {
      _id: "4",
      title: "DBMS SQL Assignment",
      description: "Write SQL queries for joins and normalization problems.",
      subject: "DBMS",
      type: "assignment",
      deadline: "2026-04-01",
      file: {
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        filename: "dbms-assignment.pdf",
        resourceType: "application/pdf",
        type: "pdf",
      },
    },
  ];

  setMaterials(dummyData);
}, []);
  const filtered = materials.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-full bg-gray-900 p-8">
      <h1 className="text-4xl text-white font-bold mb-6 text-center">
        Notes & Assignments
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search notes..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 rounded-lg bg-gray-800 text-white border border-gray-600"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm px-3 py-1 rounded-full bg-blue-600 text-white">
                {item.subject.slice(0,8)+"..."}
              </span>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  item.type === "assignment"
                    ? "bg-red-600"
                    : "bg-green-600"
                } text-white`}
              >
                {item.type}
              </span>
            </div>

            <h2 className="text-xl font-semibold text-white mb-2">
              {item.title}
            </h2>

            <p className="text-gray-400 text-sm mb-3">
              {item.description}
            </p>

            {item.deadline && (
              <p className="text-yellow-400 text-sm mb-3">
                Deadline: {new Date(item.deadline).toDateString()}
              </p>
            )}

            <div className="flex gap-3 mt-4">
              <a
                href={item.file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white text-sm cursor-pointer"
              >
                View
              </a>

              <a
                href={item.file.url}
                download
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white text-sm cursor-pointer"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No notes found.
        </p>
      )} */}
    </div>
  );
};

export default NotesShowcase;