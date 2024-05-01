import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
    const [username,setUsername]= useState("");
    const [fullName,setfullName]=useState("");
    const [skill,setSkill]=useState("")
    const [skills,setSkills]=useState([]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");

    const navigate=useNavigate();
    const handleSignup=async(e)=>{
        try {
            e.preventDefault();
            const url = "http://localhost:8000/user/signup"
            const data={
                username,
                fullName,
                skills,
                email,
                password
            }
            console.log(data)
            const user = await axios(url,{
                method: 'POST',
                mode:"no-cors",
            data:{
                ...data
            }
            })
            console.log(user)
            setSuccess(true)
        } catch (error) {
            setError(true);
            setErrorMessage(error.message)

        }
    }

  return (
    <>
      <h1 style={{textAlign:"center"}} className='my-2'>Sign Up</h1>


      {success && <div className="alert alert-success" role="alert">
            Your account is created successFUllY   <Link to="/login"><button type="button" className="btn btn-primary">Login Now</button></Link>
</div>}

    {error && <div className="alert alert-danger" role="alert">
  Some error occured while signing up . <br />
  error : {errorMessage}<br/>
  please try again
</div>}

      <div className='d-flex justify-content-center align-items-ceter my-4 '>
            <form className='w-50' >
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    value={username}
                    id="Enter UserName"
                    placeholder="Enter UserName"
                    onChange={(e)=>{
                        return setUsername(e.target.value)
                    }}
                    />
                </div>
                    <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    id="fullName"
                    placeholder="Enter Your Full Name"
                    onChange={(e)=>(setfullName(e.target.value))}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    {skills[0] && <p>skills you selected : {...skills+" "}</p>}
                    <input
                    type="text"
                    className="form-control"
                    value={skill}
                    id="skills"
                    placeholder="Enter Sills you have"
                    onChange={(e)=>{
                        setSkill(e.target.value)
                    
                    }}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                        e.preventDefault()
                        setSkills((prevSkills)=>{prevSkills.push(skill)
                             return prevSkills});
                        setSkill("")
                        
                    }}}
                    />
                </div>

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
                <div className='d-flex justify-content-center align-items-center my-2'>
                <button  className="btn btn-primary my-2" onClick={handleSignup}>
                    Sign up
                </button>
                </div>
</form>
</div>
</>
  )
}

export default Signup
