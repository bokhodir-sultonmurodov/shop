import React, { useEffect } from "react";
import { FaBell, FaCog, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
   const navigate = useNavigate();
 useEffect(()=>{
   if (!localStorage.getItem("token")) {
    return navigate("/login");
  }
 },[navigate])
  const logOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow container mx-auto">
      <div className="flex items-center gap-4">
        <div className="text-blue-600 text-2xl font-bold">b</div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium">
          <FaPlus />
          New
        </button>
      </div>

      <div className="flex-grow max-w-md mx-8">
        <input
          type="text"
          placeholder="Search group and join..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4 text-gray-600 text-lg">
        <FaBell className="cursor-pointer relative" />
        <div className="relative">
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 rounded-full">
            9+
          </span>
        </div>
        <button onClick={logOut}><FaCog className="cursor-pointer" /></button>
        
      </div>
    </header>
  );
};

export default Header;
