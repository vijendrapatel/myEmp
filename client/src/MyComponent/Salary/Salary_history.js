import { Link, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import {BsFillCaretLeftFill} from 'react-icons/bs';
import {BsFillCaretRightFill} from 'react-icons/bs';
import { useState } from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import Sidebar from "../common/Sidebar";
import Header from "../common/Header";



function Salary_history(props) {
 const[monthwise, setmonthwise]=useState(moment().format("MMMM-YYYY"))
 let decmonth;
 const PreviousmonthChange = () => {
   decmonth = moment(monthwise, "MMMM-YYYY")
     .subtract(1, "month")
     .format("MMMM-YYYY");
     setmonthwise(decmonth);
 };
 const NextmonthChange = () => {
   decmonth = moment(monthwise, "MMMM-YYYY")
     .add(1, "month")
     .format("MMMM-YYYY");
     setmonthwise(decmonth);
 };
 const columns = [
  {
    name: 'Id',
    selector: row => row.id,
    sortable: true,
},
{
  name: 'profile',
  selector: row => row.profile,
  sortable: true,
},
  {
      name: 'Staff Name',
      selector: row => row.title,
      sortable: true,
  },
  {
      name: 'Position',
      selector: row => row.director,
      sortable: true,
  },
  {
      name: 'Total Earnings',
      selector: row => row.salary,
      sortable: true,
  },
  {
    name: 'Total Deduction',
    selector: row => row.salary,
    sortable: true,

},
{
  name: 'Paid Salary',
  selector: row => row.salary,
  sortable: true,

},
{
  name: 'Basic',
  selector: row => row.salary,
  sortable: true,

},
];
const data = [
{
    id: 1,
    profile:<div class="emp_profile_img"><img src="https://bootdey.com/img/Content/avatar/avatar5.png"
      alt="Company" className='emp_profile' /></div>,
    title: 'Beetlejuice',
    director:'Developer', 
    salary:'120000'
},
{
    id: 2,
    profile:<div class="emp_profile_img"><img src="https://bootdey.com/img/Content/avatar/avatar5.png"
      alt="Company" className='emp_profile' /></div>,
    title: 'Ghostbusters',
    director:'Developer',
    salary:'120000'

},
]
  return (

    <>
      <Header/>

      <div className="container-fluid">

        <div className="row">
          <Sidebar/>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Summary</h1>
            </div>
            <h5>Search</h5>

            <div className='Search_box'>
              <label>Staff Name</label>
              <input className="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search" onChange={props.onNameChange}
              value={props.searchvalue} />
       
              <label>Month</label>
              <input className="form-control form-control-dark w-50" type="text" placeholder="Search" aria-label="Search" />
            </div>
            <div className='search_btn'>
              <button className='btn-btn-search'>Search</button>
              <button className='btn-btn-search'>Reset</button>
            </div>
         
           <div className="monthwise_salary mt-4">
            <BsFillCaretLeftFill onClick={PreviousmonthChange}/>
            <h4>{monthwise}</h4>
            <BsFillCaretRightFill onClick={NextmonthChange}/>
           </div>
           <DataTable
            columns={columns}
            data={data}
            pagination
        />
           
          </main>

        </div>

      </div>

    </>
  );
}

export default Salary_history;