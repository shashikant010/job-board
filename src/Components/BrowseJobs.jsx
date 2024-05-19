import React, { useEffect, useState } from 'react'
import Job from './Job'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import Loading from './Loading'
import "../css/browsejobs.css"

function BrowseJobs () {
  const [jobs,setJobs]=useState([])
  const [loading,setLoading]=useState(false);

  
  useEffect(()=>{
    if(!jobs[0]){
      setLoading(true)
    ;(
      async()=>{
        const url =`${import.meta.env.VITE_BACKEND_URL}/user/getalljobs`
        const res= await axios(url,{
          mode:"no-cors",
          method:"post"
        })
        
        setJobs(res.data.data)
        setLoading(false)

      }

    )()}
  })

  if(loading){
    return (
      <>
      <Loading/>
      </>
    )
  }
  return (
    <div className='main'>
       {jobs.map((job)=>{
        return(<span key={job._id} className='d-flex flex-row card'>
          <Job title={job.title}  description={job.description} job={job}/>
        </span>)
       })}
    </div>
  )
}

export default BrowseJobs
