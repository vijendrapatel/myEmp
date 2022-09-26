import React,{useEffect, useState, useMemo } from 'react';
import Axios from 'axios';
import moment from 'moment';
import DataTable  from 'react-data-table-component';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import { useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";
import { Button, Modal } from 'react-bootstrap';
import { confirm } from "react-confirm-box";

const Emplist = () => {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  
  const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
      false
    );
    let navigate = useNavigate();  
    const [employeeList, setEmployeeList] = useState([]);
    const [apicall, setapicall] = useState(false);

    const filteredItems = employeeList.filter(
      item =>
        JSON.stringify(item)
          .toLowerCase()
          .indexOf(filterText.toLowerCase()) !== -1
    );
  
    const subHeaderComponent = useMemo(() => {
      const handleClear = () => {
        if (filterText) {
          setResetPaginationToggle(!resetPaginationToggle);
          setFilterText("");
        }
      };

      return (
        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      );
    }, [filterText, resetPaginationToggle]);


   

    const getEmployees = () => {
        Axios.get("http://localhost:3001/employees").then((response) => {
          setEmployeeList(response.data);
          setapicall(false)
        });
      };
      useEffect(() => {
        getEmployees();
      },[apicall]);

      

  const HandleClick =(e)=>{

  let staffidd = e.target.value;
  localStorage.setItem('staffid',staffidd);
  navigate('/UpdateEmployee')
  }
    
  const onClickdelete = async(e) =>{
    const result = await confirm("ARE YOU SURE YOU WANT TO PERFORM THIS OPERATION");
    if (result) {
    let id = e.target.value;
    console.log("id----  "+id)
    Axios.post(`http://localhost:3001/delete/${id}`)
    .then((response) =>{
      setapicall(true)
      
  })
}

  }
      const columns = [
        {
            name: 'Id',
            selector: row => row.id,
           sortable: true,

        },
        {
            name: 'Name',
            selector: row => row.staff_name,
        sortable: true,

        },
        {
            name: 'Gender',
            selector: row => row.gender,
        sortable: true,

        },
        {
            name: 'email',
            selector: row => row.email,
        sortable: true,

        },
        {
            name: 'mobile',
            selector: row => row.mobile,
        sortable: true,

        },
        {
            name: 'Date of Joining',
            selector: row => moment(row.doj).format("YYYY-MM-DD"),
        sortable: true,

        },
        {
          name: 'Department',
          selector: row => row.department_id,
          sortable: true,

      },
        {
            name: 'City',
        sortable: true,
            selector: row => row.city,
        },
        {
            name: 'State',
            selector: row => row.state,
        sortable: true,

        },
        {
            name: 'Country',
            selector: row => row.country,
            sortable: true,

        },
        {
          name: "Actions",
          cell: (row) =>( <div> <button  onClick={HandleClick} value={row.id}>Edit</button>
          <button  onClick={onClickdelete} value={row.id}>Delete</button>
          </div> ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
          
        },
    ];

   return (
    <div className='empList_page'>
    <Header/>
    <div className="container-fluid">
        <div className="row">
    <Sidebar/>
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3">
              <h1 className="h1"><b>Employee List</b></h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                
                <button className="btn btn-sm btn-outline-secondary" onClick={()=> {navigate("/AddEmployee");}}>

                Add employee
                    </button>
                </div>
              </div>
            </div>
           <div className="dailyattendance_table">
             
              <div className="dailyattendance_table_box"> 
                <div class="row">
                  <div class="col-lg-12 card-margin">
                    <div class="card search-form">
                      <div class="card-body p-0">
                        <form id="search-form">
                          <div class="row">
                            <div class="col-12">
                              <div class="row no-gutters">
                                <div class="col-lg-8 col-md-6 col-sm-12 p-0"></div>
                                <div class="col-lg-1 col-md-3 col-sm-12 p-0"></div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              

               

      




          
    <DataTable
            pagination
            highlightOnHover
		        pointerOnHover
            defaultSortField="name"
            columns={columns}
            data={filteredItems}
            subHeader
            subHeaderComponent={subHeaderComponent}
      />  
          </div>
            </div>
          </main>
        </div>
      </div>
      </div>
    );
}

export default Emplist;
