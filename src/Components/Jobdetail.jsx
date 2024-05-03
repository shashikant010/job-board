import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useOutletContext } from 'react-router-dom'

function Jobdetail() {
    const context = useOutletContext();
    const job=context[4]
    const date= new Date(job.createdAt).toDateString()
    const [owner,setOwner]=useState("")
    useEffect(()=>{
      (async()=>{
        const url = `http://localhost:8000/user/getitem/${job.owner}`;
        const res = await axios(url,{
          method:"post",
          mode:"no-core"
        })
        setOwner(res.data.data)
      })()
    })
  return (
    <div>
            <h1 className='text-center m-4'>{job.title}</h1>
            <div style={{backgroundColor:"lightgray", height:"500px"}} className='p-3 d-flex justify-cotent-center align-items-center flex-column'>
              <div><b style={{fontSize:"30px"}}>skills required : </b> <b style={{fontSize:"30px"}}>{job.skillSet+""}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>Job description : </b> <b style={{fontSize:"30px"}}>{job.description}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>Job owner : </b> <b style={{fontSize:"30px"}}>{owner.fullName}</b> <br/></div>
              <div><b style={{fontSize:"30px"}}>posted on : </b> <b style={{fontSize:"30px"}}>{date}</b> <br/></div>
              <button  type="button" className="btn btn-success my-2">Apply Now</button></div>
            </div>

  
  )
}

export default Jobdetail
