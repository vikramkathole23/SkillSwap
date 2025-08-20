import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/navbar";
import LoginPage from "./components/login/Loginpage";
import HomePage from "./components/Home/Homepage";
import SignUpPage from "./components/signup/Signup";
import MainLayout from "./components/Profile/MainLayout";
import AddNewSkill from "./components/Profile/NewSkill";
import RequestsPage from "./components/Profile/RequestPage";
import UserProfileDetail from "./components/Profile/UserProfileDetail";
import MySessionsPage from "./components/Profile/RequestPage"; // assuming this is correct
import SwapPage from "./components/MySwap/mySwap";
import UserProfile from "./components/UserProfile/Userprofile";
import SkillUpdatePage from "./components/Home/SkillUpdatePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/my-swap" element={<SwapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/:id" element={<UserProfile />} />
        <Route path="/skill/:id/update" element={<SkillUpdatePage />} />
        {/* <Route path="/skill/:id/updatepage" element={<SkillUpdatePage/>} /> */}

        {/* Main layout with nested routes */}
        <Route path="/main" element={<MainLayout />}>
          <Route path="my-sessions" element={<MySessionsPage />} />
          <Route path="profile" element={<UserProfileDetail />} />
          <Route path="addnewskill" element={<AddNewSkill />} />
          <Route path="requests" element={<RequestsPage />} />
          {/* <Route path="skill/:id/update" element={<SkillUpdatePage />} /> */}
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
