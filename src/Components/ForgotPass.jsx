import React from 'react'
import Loading from './Loading';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/form.css"

function ForgotPass() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const [user,setUser]=useState({})
    const [loading,setLoading]=useState(false);
    const [isOtpVerified,setIsOtpVerified]=useState(false);
    const [isOtpSent,setIsOtpSent]=useState(false)
    const [otp,setOtp]=useState("")
    const [correctOtp,setCorrectOtp]=useState("")
    const [wrongOtpWritten,setWrongOtpWritten]=useState(false)
    const [isLogin,setIsLogin]=useOutletContext()
  

    const navigate=useNavigate()

    const sendOtp=async()=>{
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/sendotp`
            const data={
                email
            }
            setLoading(true)
            const res = await axios(url,{
                method: 'POST',
                mode:"no-cors",
                data
            
            })
            setLoading(false)
            const otpFromServer=res.data.data.toString()
            setCorrectOtp(otpFromServer);
            setIsOtpSent(true)
        } catch (error) {
            setError(true)
            setLoading(false)
            setErrorMessage(error.message)
        }

    }


    const verifyOtp=async()=>{
        setWrongOtpWritten(false)
        if(otp===correctOtp){
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/user/getuserbymail`
                setLoading(true)
                const res = await axios(url,{
                    method:"post",
                    mode:"no-cors",
                    data:{email}
                })
                setLoading(false)
                setUser(res.data.data[0])
          setIsOtpVerified(true)
            } catch (error) {
                setLoading(false)
                setError(true)
                setErrorMessage(error.message)
            }
        }
        else{
            setLoading(false)
            setWrongOtpWritten(true)
        }
    }


const saveChangedPassword=async()=>{
    try {
        setLoading(true)
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/changepassword`
    
        const res = axios(url,{
            method:"post",
            mode:"no-cors",
            data:{email,password}
        })
        setLoading(false)
        setSuccess(true)
    } catch (error) {
        setError(true)
            setErrorMessage(error.message)
            setLoading(false)
    }

}





  
  if(loading){
    return (<>
    <Loading/>
    </>)
  }


  
  return (
    <>

  
    {success && <div className="alert alert-success" role="alert">
            Congrats your password is changed <Link to="/login"><button type="button" className="btn btn-primary">Login Now</button></Link>
</div>}

    {error && <div className="alert alert-danger" role="alert">
  Some error occured while changing password. <br />
  error : {errorMessage}<br/>
  please try again after some timea
</div>}

    <div className='d-flex justify-content-center align-items-ceter my-4'>
   
<form action="" className="form_main">
    {!isOtpVerified && <p className="heading" style={{fontSize:"30px"}}>Oops ! you forgot it again | Don't worry</p>}
    {isOtpVerified && <p className="heading">Hii {user.username}</p>}
    <div className="inputContainer">
        <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>



        <input
      type="email"
      className="inputField"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      id="Email"
      aria-describedby="emailHelp"
      placeholder="Enter email"
      disabled={isOtpSent}
    />
    


    

  


    </div>
    {wrongOtpWritten &&

<h1 style={{color:"red",fontSize:"20px"}}>OTP was wrong</h1> 
}

              {isOtpSent && !isOtpVerified &&  <div className="inputContainer">
    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input
                    type="number"
                    className='form-control'
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    id="otp"
                    placeholder='Enter Otp'
                    />
</div>}
                {!isOtpVerified && !isOtpSent && <button id="button" onClick={(e)=>{
                    e.preventDefault();
                    sendOtp();
                }}>
                    Send OTP
                </button>
                }
                {!isOtpVerified && isOtpSent &&<button  id="button" onClick={(e)=>{
                    e.preventDefault();
                    verifyOtp();
                }}>
                    verify Otp
                </button>}


{isOtpVerified && <>
                <div className="inputContainer">
    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input
      type="password"
      className="inputField"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      id="Password"
      placeholder="Enter New Password"
    />
</div>
<p>Your new password is {password}</p>
</> }

{isOtpVerified &&<button id="button" onClick={(e)=>{
                    e.preventDefault();
                    saveChangedPassword();
                }}>
                    Save password
                </button>}
  
</form>   

</div>
</>
  )
}

export default ForgotPass