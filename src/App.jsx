import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function App() {
  const [isLogin,setIsLogin]=useState(false);
  let user={};
  const accessToken = Cookies.get("accessToken")
  useEffect(()=>{
    (async()=>{
      try {
        const url = "http://localhost:8000/user/getcurrentuser"
         const res = await axios(url,{
          method: 'POST',
          mode:"no-cors",
      data:{
          accessToken
      }
      })
      user=res.data.data
      console.log(user)
      setIsLogin(true)
      } catch (error) {
        
      }
    })()
    
  })
  return (
    <>
    <Navbar isLogin={isLogin} user={user} setIsLogin={setIsLogin}/>
    <Outlet context={[isLogin,setIsLogin]}/>
      
    </>
  )
}

export default App