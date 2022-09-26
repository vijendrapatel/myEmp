/* eslint-disable jsx-a11y/anchor-is-valid */
import '../../styles/salary/Salary_list.css';
import { Link, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Sidebar from '../common/Sidebar';
import Header from '../common/Header';
import {  useState } from 'react';
import Axios from 'axios';
import moment from "moment";
import React,{useEffect} from "react";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { BsFillCaretRightFill } from "react-icons/bs";

const ExpandedComponent = ({ data }) => <div className="dropdown_detail">
<div className="dropdown_personaldet">
<h6 className="datastaffname">{data.staff_name}</h6>
<h6 className="mx-3">{data.gender}</h6>
<h6>{data.city}</h6>
</div>
<div className="dropdown_personaldetail">
<h6 className="datastaffname">{data.address}</h6>
<h6>{moment(data.dob).format('DD-MMMM-YYYY')}</h6>
</div>
</div>;
function Salary_list(props) {
  const [employeeList, setEmployeeList] = useState([]);
  const [salaryList, setsalaryList] = useState([]);
  const [attendmonth, setattendmonth] = useState(
    moment().format(`YYYY-MM-DDT00:00:00+00:00`)
  );
  const PreviousmonthChange = () => {
    let decmonth = moment(attendmonth)
      .subtract(1, "month")
      .format(`YYYY-MM-DDT00:00:00+00:00`);
    getEmployees();
    setattendmonth(decmonth);
   
  };

  const NextmonthChange = () => {
    let decmonth = moment(attendmonth)
      .add(1, "month")
      .format(`YYYY-MM-DDT00:00:00+00:00`);

    getEmployees();
    setattendmonth(decmonth);
 
  };

  // date
 
  let momentmonth = moment(attendmonth, "YYYY-MM").daysInMonth();

  let firstdate = moment(attendmonth, "YYYY-MM")
    .startOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  let lastdate = moment(attendmonth, "YYYY-MM")
    .endOf("month")
    .format(`YYYY-MM-DDT00:00:00+00:00`);
  const getEmployees = () => {
   
    Axios.get(`http://localhost:3001/salary/${firstdate}/${lastdate}`).then((response) => {
      setsalaryList(response.data);
    });
  
  };
  useEffect(() => {
    getEmployees();
  }, [attendmonth]);
  const salarygenereate =(e)=>{
    // let arr = e.target.value.split(',')
  let staffidd = e.target.value;
  localStorage.setItem('staffid',staffidd);
  navigator('/GenerateSalary')
  }
 
  // let ageSum = 0
  // for (let i = 0; i <= salaryList.length; i++) {
  //   ageSum += salaryList[i].salary
  // }
  // console.log("ageSum------4444444------"+ageSum);

  const columns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
  },
 
    {
        name: 'Staff Name',
        selector: row => row.staff_name,
        sortable: true,
    },
    {
      
        name: 'Salary',
        selector: row => row.salary,
        sortable: true,
    },
    {
      name: 'Current Salary',
      selector: row => row.total,
      sortable: true,
  },
    {
      name: 'Action',
      selector: row => <button className="btn btn-sm btn-outline-secondary" value={row.id} onClick={(row.salary === null || row.salary === 0 || row.salary === '0') 
      // && row.total != null || row.total != ''
       ?  {undefined}
      :salarygenereate}>{(row.total === null || row.total === '' || row.total === '0')  ? 'Generate salary' : 'Generated'}</button>,
      sortable: false,

  },
];
const navigator=useNavigate();



  return (

    <>
        <Header/>
      <div className="container-fluid">

        <div className="row">
          <Sidebar/>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 salarylistbox_table">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom salarylistbody_table">
              <h1 className="h1"><b>Salary Management</b></h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                <Link to='/Salary_history' className="nav-link">

                  <button className="btn btn-sm btn-outline-secondary">Salary Summary</button>
                </Link>
                 
                </div>
                
              </div>
            </div>
           
            

            <div className="monthname_sort ">
                  <BsFillCaretLeftFill onClick={PreviousmonthChange} />
                  <h4 className="monthname_text">
                    {moment(attendmonth).format("MMMM-YYYY")}
                  </h4>
                  <BsFillCaretRightFill onClick={NextmonthChange} />
                </div>
            <DataTable
            columns={columns}
            data={salaryList}
            pagination
            expandableRows
            expandableRowsComponent={ExpandedComponent}
          
        />
          </main>

        </div>

      </div>

    </>
  );
}

export default Salary_list;