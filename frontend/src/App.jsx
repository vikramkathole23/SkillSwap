import React from "react";
import { useLocation, BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import "./style/home.responsive.module.css"
// import "./style/homeCardStyle.module.css"
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/navbar";
import LoginPage from "./components/login/Loginpage";
import HomePage from "./components/Home/Homepage";
import SignUpPage from "./components/signup/Signup";
import MainLayout from "./components/Profile/MainLayout";
import AddNewSkill from "./components/Profile/NewSkill";
import RequestsPage from "./components/Profile/RequestPage";
import UserProfileDetail from "./components/Profile/UserProfileDetail";
import MySessionsPage from "./components/Profile/RequestPage";
import SwapPage from "./components/MySwap/mySwap";
import UserProfile from "./components/UserProfile/Userprofile";
import SkillUpdatePage from "./components/Home/SkillUpdatePage";
import ChatPage from "./components/chatPage";
import VideoMeetComponent from "./components/videoStream/videoMeetPage";
// import Otp from "./components/signup/otpComponent";
import OTPVerification from "./components/signup/otpComponent";
import ProtectedRoute from "./routProtecterMeddelware";
import EditUserDeteil from "./components/Profile/EditUserProfileDeteils";
import AddNotesAndAssignmentForm from "./components/MySwap/addNotesAndAssignmentForm";

function App() {
  const location = useLocation();
  return (
    <>
      {/* // <BrowserRouter> */}
      {/* <Routes/>
       <Route path='/home/stream/:url' element={<VideoMeetComponent />} />
    <Routes/> */}
      {location.pathname == "skillSwap-video-call/stream/:url" ? (
        ""
      ) : (
        <Navbar />
      )}
      {/* <Navbar/> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/my-swap" element={<SwapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addnotes" element={<AddNotesAndAssignmentForm />} />
        {/* <Route path="/signup/verify-email" element={<OTPVerification />} /> */}
        <Route
          path="/addnewskill"
          element={
            <ProtectedRoute>
              <AddNewSkill />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skill/:id/update"
          element={
            <ProtectedRoute>
              <SkillUpdatePage />
            </ProtectedRoute>
          }
        />
        <Route path="/account/user/:id" element={<UserProfile />} />
        <Route path="/home/user/:id/chat" element={<UserProfile />} />
        <Route path="/user/:id/chat" element={<ChatPage />} />
        <Route
          path="skillSwap-video-call/stream/:url"
          element={
            <ProtectedRoute>
              <VideoMeetComponent />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/skill/:id/updatepage" element={<SkillUpdatePage/>} /> */}

        {/* Main layout with nested routes */}
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="my-sessions" element={<MySessionsPage />} />
          <Route path="profile" element={<UserProfileDetail />} />
          <Route path="edituserdeteil" element={<EditUserDeteil />} />
          <Route path="requests" element={<RequestsPage />} />
          {/* <Route path="skill/:id/update" element={<SkillUpdatePage />} /> */}
        </Route>
      </Routes>
      {/* <Route path='/stream/:url' element={<VideoMeetComponent />} /> */}
      <Toaster position="top-right" reverseOrder={false} />
      {/* // </BrowserRouter> */}
    </>
  );
}

export default App;
