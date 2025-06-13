import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Outlet, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiSolidMessageRounded } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "../../../constants";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showGroups, setShowGroups] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const info = await axios.get(`${BASE_URL}/groups`, {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      });
      setData(info);
    };
    getData();
  }, []);

  const createData = async () => {
    axios.post(
      `${BASE_URL}/groups`,
      {
        name,
        password,
      },
      {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex h-[calc(100vh-60px)]">
        <aside className="w-64 bg-white p-4 shadow-md rounded-r-2xl flex flex-col gap-4">
          <Link
            to={"profile"}
            className="flex items-center gap-2 text-lg font-semibold text-gray-800 hover:text-blue-600 transition"
          >
            <CgProfile className="text-2xl" />
            Profile
          </Link>

          <div
            className="relative group"
            onMouseEnter={() => setShowGroups(true)}
            onMouseLeave={() => setShowGroups(false)}
          >
            <div className="flex items-center justify-between text-lg font-semibold text-gray-800 cursor-pointer">
              <span className="flex items-center gap-2">
                <BiSolidMessageRounded className="text-2xl" />
                Groups
              </span>
            </div>

            {showGroups && (
              <div className="absolute top-full mt-2 left-0 w-full bg-white rounded-xl p-3 shadow-xl z-50 flex flex-col gap-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium shadow hover:bg-blue-200 transition"
                >
                  + Create Group
                </button>

                {data?.data?.map((item) => (
                  <Link
                    to={`group/${item._id}`}
                    key={item._id}
                    className="block bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl shadow text-gray-700 font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>

        <main
          className="flex-1 bg-cover bg-center p-6 overflow-y-auto relative"
          style={{ backgroundImage: `url('/your-image.jpg')` }}
        >
          {isModalOpen && 
            <div className="absolute top-48 left-1/2 -translate-x-1/2 bg-white shadow-xl border border-blue-200 rounded-2xl w-80 z-50 p-6">
              <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">
                Create Group
              </h2>
              <input
                type="text"
                placeholder="Group name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={createData}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          }

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
