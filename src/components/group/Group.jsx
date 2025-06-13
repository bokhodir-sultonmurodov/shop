import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../../constants'

const Group = () => {
    
    const [data, setData] = useState()
    const { id } = useParams()
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
   const singleData = data?.data.filter((item)=>item._id=== id)
   console.log(singleData);
   
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto mt-10">
  <div className="flex justify-between items-start">
    <h1 className="text-3xl font-bold">Group Info</h1>
    <div className="flex gap-2">
      <button className="bg-blue-600 text-white px-3 py-1 rounded">✏️ Edit Name</button>
      <button className="bg-red-600 text-white px-3 py-1 rounded">🗑️ Delete Group</button>
    </div>
  </div>

  <div className="flex items-center gap-4 mt-6">
    <div className="w-28 h-28 rounded-full bg-purple-600 text-white text-5xl flex items-center justify-center shadow">
      {singleData && singleData[0]?.name?.[0]?.toUpperCase()}
    </div>
    <div>
      <h2 className="text-2xl font-semibold">
        {singleData && singleData[0]?.name}
        <span className="ml-2 bg-green-700 text-white text-sm px-2 py-0.5 rounded">Active</span>
      </h2>
      <p className="text-gray-500">Group Owner: {singleData && singleData[0]?.owner?.username}</p>
    </div>
  </div>
</div>


    )
}

export default Group