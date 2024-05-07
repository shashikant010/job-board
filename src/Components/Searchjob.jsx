import React, { useEffect, useState } from 'react'
import Job from './Job'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'

import "../css/searchbox.css"


function SearchJob () {
  const [jobs,setJobs]=useState([])
  const [serachItem,setSearchItem]=useState("")
  
  useEffect(()=>{
    
    ;(
      
      async()=>{
        const url =`import.meta.env.VITE_BACKEND_URL/user/searchjob/${serachItem}`
        const res= await axios(url,{
          mode:"no-cors",
          method:"post"
        })
        
        setJobs(res.data.data)

      }

    )()},[serachItem]
  )
  return (
    <>
    <div className='d-flex justify-content-center align-items-ceter '>
    <div className="InputContainer ">
  <input value={serachItem} onChange={(e)=>{setSearchItem(e.target.value)}} placeholder="Search.." id="input" className="input" name="text" type="text"/>
  </div>
  
</div>
    
    <div className='d-flex flex-row flex-wrap'>
        
       {jobs.map((job)=>{
        return(<span key={job._id} className='d-flex flex-row ' style={{width:"20%"}}>
          <Job title={job.title}  description={job.description} job={job}/>
        </span>)
       })}
    </div>
    </>
  )
}

export default SearchJob
