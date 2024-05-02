import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");

  const navigate=useNavigate()

  const [isLogin,setIsLogin]=useOutletContext()
  console.log(isLogin)

  let accessToken = Cookies.get("accessToken")
  console.log(accessToken)
  const handleLogin=async(e)=>{
    try {
        e.preventDefault();
        const url = "http://localhost:8000/user/login"
        const data={
            email,
            password
        }
        const user = await axios(url,{
            method: 'POST',
            mode:"no-cors",
        data:{
            ...data
        }
        })
        const accesstoken = user.accesstoken;
        console.log(user.data.data.accessToken)
        Cookies.set("accessToken",user.data.data.accessToken)
        setSuccess(true)
        setIsLogin(true)
        localStorage.setItem("accessToken",user.data.data.accessToken)
        navigate("/")
    } catch (error) {
        setError(true);
        setErrorMessage(error.message)

    }
}

  return (
    <>
    <h1 style={{textAlign:"center"}} className='my-2'>Login</h1>

    {success && <div className="alert alert-success" role="alert">
            You are logged in <Link to="/login"><button type="button" className="btn btn-primary">Login Now</button></Link>
</div>}

    {error && <div className="alert alert-danger" role="alert">
  Some error occured while Logging in . <br />
  error : {errorMessage}<br/>
  please try again after some time
</div>}


    <div className='d-flex justify-content-center align-items-ceter my-4'>
      
    <form className='w-50'>
  <div className="form-group">
    <label htmlFor="Email">Email address</label>
    <input
      type="email"
      className="form-control"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      id="Email"
      aria-describedby="emailHelp"
      placeholder="Enter email"
    />
  </div>
  <div className="form-group">
    <label htmlFor="Password">Password</label>
    <input
      type="password"
      className="form-control"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      id="Password"
      placeholder="Password"
    />
  </div>
  <button type="submit" onClick={handleLogin} className="btn btn-primary my-2">
    Submit
  </button>
</form>
</div>
</>
  )
}

export default Login
