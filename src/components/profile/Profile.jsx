import React from 'react'

const Profile = () => {
  return (
    <div>
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">Your Profile</h1>
              <div className="flex gap-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded">📋 Copy Username</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded">🗑️ Delete Account</button>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <div className="w-28 h-28 rounded-full bg-rose-600 text-white text-5xl flex items-center justify-center shadow">L</div>
              <div>
                <h2 className="text-2xl font-semibold">Laylo <span className="ml-2 bg-green-700 text-white text-sm px-2 py-0.5 rounded">Active</span></h2>
                <p className="text-gray-500">laylo02</p>
              </div>
            </div>
          </div>
    </div>
  )
}

export default Profile