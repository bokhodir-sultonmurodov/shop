import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../../constants'
import { FiTrash } from 'react-icons/fi' // 🗑 Trash icon

const Group = () => {
  const [data, setData] = useState()
  const [itemInput, setItemInput] = useState('')
  const [items, setItems] = useState([])
  const [user, setUser] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      const info = await axios.get(`${BASE_URL}/groups`, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      })
      setData(info)

      const userInfo = await axios.get(`${BASE_URL}/auth/me`, {
        headers: {
          'x-auth-token': `${localStorage.getItem('token')}`,
        },
      })
      setUser(userInfo.data.username || userInfo.data.email)
    }
    getData()
  }, [])

  const singleData = data?.data.filter((item) => item._id === id)

  const handleAddItem = () => {
    if (!itemInput.trim()) return

    const now = new Date()
    const time = now.toLocaleString()

    const newItem = {
      title: itemInput,
      createdBy: user,
      createdAt: time,
    }

    setItems((prev) => [...prev, newItem])
    setItemInput('')
  }



  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">Group Info</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">✏️ Edit Name</button>
          <button className="bg-red-600 text-white px-3 py-1 rounded">🗑 Delete Group</button>
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
          <p className="text-gray-500">
            Group Owner: {singleData && singleData[0]?.owner?.username}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Items</h3>
        <div className="flex gap-2">
          <input
            type="text"
            className="border px-3 py-1 rounded w-full"
            placeholder="Enter item title"
            value={itemInput}
            onChange={(e) => setItemInput(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-1 rounded"
            onClick={handleAddItem}
          >
            ➕
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-sm text-gray-600">
                  Created by:{' '}
                  <span className="font-medium">
                    {singleData && singleData[0]?.owner?.username.toUpperCase()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Created at: {item.createdAt}</p>
              </div>
              <button
                
                className="text-red-600 hover:text-red-800 text-xl mt-1"
              >
                <FiTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Group