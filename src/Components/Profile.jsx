import React, { useEffect } from 'react'
import { useNavigate, useOutletContext, } from 'react-router-dom'
import { Link } from 'react-router-dom';

// {!isLogin && <h1>Please Login to see your profile</h1>}
function Profile() {
    const [isLogin]=useOutletContext()
    const context = useOutletContext();
    const navigate = useNavigate()
    const user = context[2];
    let lastLoginTime=null;
    if(isLogin){
        const date=new Date(user.updatedAt)
        console.log(date)
        lastLoginTime=date.toString()
    }

    
     if(!isLogin){
        return(
            <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
                <h2 className='h-200 ' style={{margin:"300px"}}>Please <Link to="/login"><button type="button" className="btn btn-info text-white" style={{fontSize:"24px" , fontWeight:"bold"}}>Login</button></Link> to see your profile</h2>
                </div>
        )
     }
     if(isLogin){
        return(
            // <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
            //     <h2 className='h-200 ' style={{margin:"300px"}}>hello this is your profile {user.fullName}</h2>
            //     </div>
            <div className='container d-flex flex-column justify-content-center align-items-center' style={{height:"600px", width:"100%"}}>

                <div className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor:"lightblue",border:"2px solid black",borderRadius:"50%",width:"150px", height:"150px"}}><h1 style={{textAlign:"center",fontSize:"70px"}}><i class="fa-solid fa-user "></i><br/><p style={{textAlign:"center",fontSize:"30px"}}>{user.username}</p></h1></div>
                <div className="my-2" style={{backgroundColor:"lightgray",height:"60%",width:"100%",padding:"20px",borderRadius:"10px"}}>
                {!user.isEmployer&&<h3>Skills: </h3>}{user.skills.map((item)=>{
                    return(
                        <span style={{fontWeight:"bold",fontSize:"30px"}}>{item} </span>
                    )
                })}
                <h3>Joined at: </h3>
                        <span style={{fontWeight:"bold",fontSize:"30px"}}>
                            {new Date(user.createdAt).toDateString()}
                            </span>
                
                <h3>Email: </h3>
                <span style={{fontWeight:"bold",fontSize:"30px"}}>{user.email} </span>
                
                <h3>Last login: </h3>
                <span style={{fontWeight:"bold",fontSize:"30px"}}>{lastLoginTime} </span>
                </div>

                {user.isEmployer && <button onClick={()=>{
          navigate("/postjob")
        }} type="button" className="btn btn-success my-2">Post Jobs</button>}


            </div>
        )
     }
}

export default Profile











// function dispatchSetState(fiber, queue, action) {
//     {
//       if (typeof arguments[3] === "function") {
//         error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
//       }
//     }