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
        <div>
            {
                singleData && singleData[0]?.name
            }
        </div>
    )
}

export default Group