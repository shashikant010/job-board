import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useOutletContext } from 'react-router-dom'
import Loading from './Loading';

function Jobdetail() {
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(null)
  const [owner,setOwner]=useState("")
  const [loading,setLoading]=useState(false);

    const context = useOutletContext();
    const job=context[4]
    const user=context[2]
  
    const date= new Date(job.createdAt).toDateString()
    useEffect(()=>{
      setLoading(true)
      if(!job){
      (async()=>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/getitem/${job.owner}`;
        const res = await axios(url,{
          method:"post",
          mode:"no-core"
        })
        setOwner(res.data.data)
        setLoading(false)
      })()}
      setLoading(false)
    })
    
    const handleApply=async()=>{
        setLoading(true)
       const url = `${import.meta.env.VITE_BACKEND_URL}/user/applyforjob`
       const data={
         jobid:job._id,
         userid:user._id
       }
 
       const res = await axios(url,{
         method:"post",
         mode:"no-core",
         data:data
       }).catch((error)=>{
        if(error.response.status===409){
          setError("Already applied")
          setLoading(false)
        }
        else {setError(error.message)
          setLoading(false)
        }
        
       })

       if(res.status===200){
        setSuccess(true)
        setLoading(false)
       }
     

      
    }

    if(loading){
      return (
        <>
        <Loading/>
        </>
      )
    }


  return (
    <>
    
    {/* {success && <div className="alert alert-success" role="alert">
            You have successfully applied</div>
    }

    {error && <div className="alert alert-danger" role="alert">
            Error while applying {error}</div>} */}


    <div>
    {success && <div className="alert alert-success" role="alert">
            You have successfully applied</div>
    }
    {error && <div className="alert alert-danger" role="alert">
            Error while applying ::  {error}</div>}
    
            <h1 className='text-center m-4'>{job.title}</h1>
            <div style={{backgroundColor:"lightgray", height:"500px"}} className='p-3 d-flex justify-cotent-center align-items-center flex-column'>
              <div><b style={{fontSize:"30px"}}>skills required : </b> <b style={{fontSize:"30px"}}>{job.skillSet+""}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>Job description : </b> <b style={{fontSize:"30px"}}>{job.description}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>Job owner : </b> <b style={{fontSize:"30px"}}>{owner.fullName}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>posted on : </b> <b style={{fontSize:"30px"}}>{date}</b> <br/></div>
              <button  type="button" className="btn btn-success my-2" onClick={handleApply}>Apply Now</button></div>
            </div>

            </>
  )
}

export default Jobdetail
