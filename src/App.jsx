import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/layout/Layout";
import Group from "./components/group/Group";
import Profile from "./components/profile/Profile";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route path="group/:id" element={<Group/>}/>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>404 not found</h1>} />
          </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

