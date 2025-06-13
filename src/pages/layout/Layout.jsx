import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Outlet,Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BiSolidMessageRounded } from "react-icons/bi";
import axios from "axios";
import { BASE_URL } from "../../../constants";
const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState()
  const [name,setName]= useState("")
  const [password,setPassword]= useState("")


   useEffect(()=>{  
    

    const getData = async ()=>{
      const info = await axios.get(`${BASE_URL}/groups`,
        {
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,}
      }
    )    
    setData(info)
  }
  getData()
   },[])
 
   console.log(data);
   
    const createData = async () => {
     axios.post(`${BASE_URL}/groups`, {
        name, password
      },{
        headers: {
          "x-auth-token": `${localStorage.getItem("token")}`,}
      })
    }
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <div className="flex h-[calc(100vh-60px)]">
        <aside className="w-60 bg-gray-100 p-3 flex flex-col gap-2">
          <Link to={"profile"} className="text-lg font-semibold mb-3"><CgProfile />Profile</Link>
          <div className="text-lg font-semibold flex items-center justify-between">
            <span><BiSolidMessageRounded />Groups</span>
            {/* <span>⬇</span> */}
          </div>
          <button onClick={() => setIsModalOpen(true)} className="text-blue-600">+ Create Group</button>
          {/* <button className="bg-white rounded px-3 py-2 shadow">ghgh</button>
          <button className="bg-white rounded px-3 py-2 shadow">ghghh</button> */}
          {
            data?.data?.map((item)=>{
            return  <div key={item._id}>
              <Link to={`group/${item._id}`}>{item.name}</Link>
            </div>
            })
          }
        </aside>
          
        <main className="flex-1 bg-cover bg-center p-6" style={{ backgroundImage: `url('/your-image.jpg')` }}>
          
          {isModalOpen ? 
            <div className="absolute top-60 left-40 bg-white shadow-lg border border-blue-500 rounded-lg w-60 z-50 p-4">
              <h2 className="text-lg font-semibold mb-3">Create Group</h2>
              <input
                type="text"
                placeholder="Group name"
                className="w-full border rounded px-3 py-2 mb-3"
                onChange={(e)=>setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="password"
                className="w-full border rounded px-3 py-2 mb-3"
                onChange={(e)=>setPassword(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  Cancel
                </button>
                <button onClick={createData} className="px-3 py-1 bg-blue-600 text-white rounded">
                  Create
                </button>
              </div>
            </div>
           : <></>}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
