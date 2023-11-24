import React from 'react'
import { NavLink , Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/UserContext'

function Header() {
  const [auth , setAuth] = useAuth()
  const handleLogout =()=>{
    setAuth({
      ...auth ,
      user : null
    })
    localStorage.removeItem('auth');

  }
  return (
    <div >
  <nav className="navbar navbar-expand-lg bg-dark text-white ">
  <div className="container-fluid containerfluidnav">
    <Link className="navbar-brand" to="#"><b style={{color:'white'}}>
Expense Managment App </b></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {!auth.user? (<>
          <li className="nav-item">
          <NavLink className="nav-link btn btn-primary m-2 addtransbtn" aria-current="page" to="/login" style={{color:'white'}}>Login </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link  btn btn-info m-2 addtransbtn" to="/register"  style={{color:'white'}}>Register</NavLink>
        </li>
        </>): (<>
          <li className="nav-item">
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link btn btn-danger addtransbtn" style={{color:'white'}}
                    >
                      Logout
                    </NavLink>
                  </li>
        </>)}
     
        
       
       
      
      </ul>
     
    </div>
  </div>
</nav>

{/* <div className = 'container-fluid'>
  <div className='row d-flex justify-content-between align-items-center'>
    <div className='col-md-5'>
      <h3 className='titleName'><b>
Expense Managment App </b></h3>
    </div>
    <div className='col-md-4'>
    {!auth.user? (<>
          <NavLink className="nav-link btn btn-primary m-2" aria-current="page" to="/login">Login </NavLink>
          <NavLink className="nav-link  btn btn-info m-2" to="/register">Register</NavLink>
        </>): (<>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="nav-link btn btn-danger"
                    >
                      Logout
                    </NavLink>
        </>)}
    </div>
  </div>
</div> */}

    </div>
  )
}

export default Header


