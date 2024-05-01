import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function App() {
  const [isLogin,setIsLogin]=useState(false);
  const accessToken = Cookies.get("accessToken")
  useEffect(()=>{
    (async()=>{
      try {
        const url = "http://localhost:8000/user/getcurrentuser"
        const user = await axios(url,{
          method: 'POST',
          mode:"no-cors",
      data:{
          accessToken
      }
      })
      console.log(user)
      } catch (error) {
        
      }
    })()
    
  })
  return (
    <>
    <Navbar/>
    <Outlet/>
      
    </>
  )
}

export default App
