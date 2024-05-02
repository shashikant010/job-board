import React, { useEffect, useState } from 'react'
import Job from './Job'
import axios from 'axios'

function BrowseJobs () {
  const [jobs,setJobs]=useState([])
  useEffect(()=>{
    ;(
      async()=>{
        const url ="http://localhost:8000/user/getalljobs"
        const res= await axios(url,{
          mode:"no-cors",
          method:"post"
        })
        
        setJobs(res.data.data)

      }

    )()
  })
  return (
    <div className='d-flex flex-row'>
       {jobs.map((job)=>{
        return(<span key={job._id} className='d-flex flex-row ' style={{width:"20%"}}>
          <Job title={job.title}  description={job.description}/>
        </span>)
       })}
    </div>
  )
}

export default BrowseJobs
