import React, { useEffect, useState } from "react";
import { FaBell, FaCog, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/login");
    }
  }, [navigate]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 shadow container mx-auto">
      <div className="flex items-center gap-4">
        <div className="text-blue-600 text-2xl font-bold">Shop</div>
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

        <div className="relative">
          <FaCog
            className="cursor-pointer"
            onClick={() => setShowLogout((prev)=>!prev)}
          />
          {showLogout && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg px-4 py-2 text-sm text-gray-700 z-50">
              <button style={{ whiteSpace: "nowrap" }} onClick={logOut}>Log Out</button>

            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
