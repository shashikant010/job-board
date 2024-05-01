import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">
    Job Board
  </Link>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavDropdown"
    aria-controls="navbarNavDropdown"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#">
          Home 
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Features
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
           Search Jobs 
        </a>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </li>
    </ul>
    
  </div>
  <Link to="/login"><button type="button" className="btn btn-primary">Login</button></Link>
  <Link to="/signup"><button type="button" className="btn btn-primary mx-2">Sign up</button></Link>
</nav>

  

  )
}

export default Navbar
