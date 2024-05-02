import React from 'react'

function Job({title,description}) {
  return (
    <div className="card m-4" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href="#" className="btn btn-primary">Apply now</a>
  </div>
</div>
  )
}

export default Job
