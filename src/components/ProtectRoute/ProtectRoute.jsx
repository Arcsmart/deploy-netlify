import React from 'react'
import { useEffect,useContext } from 'react'
import { DataContext } from '../DataProvider/Dataprovider'
import { useNavigate } from 'react-router-dom'

const ProtectRoute = ({children,msg,redirect}) => {
      const [{user},dispatch] =useContext(DataContext)
      const navigate=useNavigate()

      useEffect(()=>{
          if(!user){
            navigate("/auth",{state:{msg,redirect}})        

          }
          
      })   


  return children
}

export default ProtectRoute