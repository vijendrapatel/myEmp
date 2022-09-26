import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>


             <nav className="col-md-2 d-none d-md-block bg-light sidebar">

            <div class="profile-card">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="user" class="profile-photo"/>
            	<h5><a href="#" class="text-white">Sarah Cruiz</a></h5>
            	<a href="#" class="text-white"><i class="fa fa-user"></i> 1,299 followers</a>
            </div>
            <ul class="nav-news-feed">
              <li><i class="fa-solid fa-house m-0"></i><div className='m-0'><Link to="/dashboard" className="nav-link">
                    <span data-feather="shopping-cart"></span>
                    Dashboard
                  </Link></div></li>
                  <li><i class="fa fa-user" aria-hidden="true  m-0"></i><div className=' m-0'><Link to="/Emplist" className="nav-link">
                    <span data-feather="shopping-cart"></span>
                    Employee
                  </Link></div></li>
              <li><i class="fa-solid fa-building-user  m-0"></i><div className=' m-0'> <Link to="/Department" className="nav-link">
                    <span data-feather="users"></span>
                    Department
                  </Link></div></li>
                  <li><i className='fa fa-file-powerpoint-o  m-0'></i><div className=' m-0'> <Link to="/Attendance" className="nav-link">
                    <span data-feather="users"></span>
                    Attendance
                  </Link></div></li>
              <li><i class="fas fa-hand-holding-usd  m-0"  ></i><div className=' m-0'><Link to="/Salary_list" className="nav-link">
                    <span data-feather="users"></span>
                    Salary
                  </Link></div></li>
                  <li><i class="fa fa-bed  m-0"></i><div className=' m-0'><Link to="/leaves" className="nav-link">
                    <span data-feather="users"></span>
                    Leaves
                  </Link></div></li>
                  <li><i class="fa fa-area-chart  m-0"></i><div className=' m-0'><Link to="/all_leaves" className="nav-link">
                    <span data-feather="users"></span>
                   History Leaves
                  </Link></div></li>
                  <li><i class="fa fa-area-chart  m-0"></i><div className=' m-0'><Link to="/holiday" className="nav-link">
                    <span data-feather="users"></span>
                   Holiday
                  </Link></div></li>
              
            </ul>
        
  </nav>
             
        </>
    );
}

export default Sidebar;
