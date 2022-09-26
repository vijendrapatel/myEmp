import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmpHeader = () => {
  let navigate = useNavigate();
  const signOut = () =>{
    localStorage.setItem("authenticated",null);
    navigate("/emplogin");
  }
  return (
    <div>
      <Nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 mb-3">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
          Company name
        </a>
        {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> */}
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
          <button className="btn btn-sm btn-outline-secondary" onClick={signOut} >
          Sign out </button>
          </li>
        </ul>
      </Nav>
    </div>
  );
};

export default EmpHeader;
