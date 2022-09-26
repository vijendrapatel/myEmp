import React, { useState, useEffect,useMemo } from "react";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import Axios from "axios";
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import Inputadd from "./Inputadd";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { confirm } from "react-confirm-box";

const Department = () => {
  const [Departmentdata, setDepartmentdata] = useState([]);
  const [departname, setdepartname] = useState("");
  const [isedit, setisedit] = useState(false);
  const [isnameadd, setisnameadd] = useState(false);
  const [SelectedData, setSelectedData] = useState(null);
  const [nameedit, setnameedit] = useState("");
  const [apicall, setapicall] = useState(false);

  const getDepartment = () => {
    Axios.get("http://localhost:3001/department").then((response) => {
      setDepartmentdata(response.data);
      setapicall(false)
    });
  };
  useEffect(() => {
    getDepartment();
  }, [apicall]);



  // search sectuon


  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = Departmentdata.filter(
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

    // 
  const DelClick = async(id) => {
    const result = await confirm("ARE YOU SURE YOU WANT TO PERFORM THIS OPERATION");
    if (result) {

    Axios.get(`http://localhost:3001/departmentdelete/${id}`, {
    }).then((response) => {
      setapicall(true)

    });
  };
}

  const editClick = (id) => {
   
    {
      Departmentdata.map((depdata) => {
        if (depdata.id == `${id}`) {
          setnameedit(depdata.department_name)
          setSelectedData(depdata.id);
          setisedit(!isedit);
        }
      });
    }
  };
  const onNameEdit = (e) => {
    setnameedit(e.target.value);
  };
  const onNameAdd = (e) => {
    setdepartname(e.target.value);
  };

  // add
  const addDEpartment = () => {
    
    setisnameadd(true);
  //   if(!departname){
     
  //     toast("Please Enter the name", {
  //       position: "top-center",
  //       autoClose: 5000,
  //     })
  //     return false;
   
  // }
    if (isnameadd == true && departname ) {
     
      Axios.post("http://localhost:3001/departmentcreate", {
        department_name: departname,
      }).then((response) => {
        setisnameadd(false);
        setdepartname('')
        setapicall(true)

      });
    }
  };
  const CancelClick = () => {
    setdepartname("");
    setisnameadd(false);
    setResetPaginationToggle(true);
  };
  const CAnceledit = () => {
    setisedit(false);
    setSelectedData(null);
    setnameedit("")
  };
  const updateClick = (id) => {
    Axios.post(`http://localhost:3001/departmentupdate`, {
      id: `${id}`,
      department_name: nameedit,
    }).then((response) => {});
    setisedit(false);
    setSelectedData(null);
    setapicall(true)

  };
  //
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => {
        return SelectedData === row.id ? (
          <input
            type={"text"}
            onChange={onNameEdit}
            className={"editnameinput"}
            value={nameedit}
          />
        ) : (
          row.department_name
        );
      },
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => [
        SelectedData === row.id && isedit === true ? (
          <>
            <i
              key={row.title}
              onClick={updateClick.bind(this, row.id)}
              className="firsticpn fa-solid fa-plus"
            ></i>
            ,
            <i
              onClick={CAnceledit.bind(this, row.id)}
              className="fa-solid fa-xmark"
            ></i>
          </>
        ) : (
          <>
            <i
              key={row.title}
              onClick={editClick.bind(this, row.id)}
              className="firsticpn fas fa-pen"
            ></i>
            ,
            <i
              onClick={DelClick.bind(this, row.id)}
              className="fas fa-trash-alt"
            ></i>
          </>
        ),
      ],
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <>
      <Header />
      <div className="container-fluid">
      <ToastContainer />

        <div className="row">
          <Sidebar />
          {/*  */}
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            {/* main section */}
            
            <div class="row department_header col-md-12">
              <div class="col-sm-10">
                <h1>
                  <b>Department Details</b>
                </h1>
              </div>
              <div class="col-sm-2">
                <div class="addinput_popup">
                  <button
                    type="button"
                    class="btn btn-info add-new"
                    onClick={addDEpartment}
                  >
                    <i class="fa fa-plus"></i> Add New
                  </button>
                  {isnameadd === true ? (
                   <Inputadd value={departname} onChange={onNameAdd} onCrossclick={CancelClick}/>
                   
                  ) : null}
                </div>
              </div>
            </div>
           
            <DataTable
              highlightOnHover
              pointerOnHover
              pagination
              columns={columns}
              data={filteredItems}
              subHeader
              subHeaderComponent={subHeaderComponent}
            />
          </main>
        </div>
      </div>
      <script></script>
    </>
  );
};

export default Department;
