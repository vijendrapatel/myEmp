import React, { useEffect, useState, useMemo } from "react";
import Axios from "axios";
import moment from "moment";
import DataTable from "react-data-table-component";
import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import { useNavigate } from "react-router-dom";
import SearchSection from "../common/SearchSection";
import FilterComponent from "../EmpList/FilterComponent";

const ManageLeaves = () => {
  let navigate = useNavigate();
  let auth = localStorage.getItem("authenticated");
    if(auth == null || auth == undefined || auth != 'success'){
     navigate("/");
  }
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
   



  const [leavesList, setleavesList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/leaves").then((response) => {
      setleavesList(response.data);
    });
  };
  useEffect(() => {
    getEmployees();
  }, []);
  // const filteredItems = leavesList.filter(
  //   item =>
  //     JSON.stringify(item)
  //       .toLowerCase()
  //       .indexOf(filterText.toLowerCase()) !== -1
  // );

  // const subHeaderComponent = useMemo(() => {
  //   const handleClear = () => {
  //     if (filterText) {
  //       setResetPaginationToggle(!resetPaginationToggle);
  //       setFilterText("");
  //     }
  //   };

  //   return (
  //     <FilterComponent
  //       onFilter={e => setFilterText(e.target.value)}
  //       onClear={handleClear}
  //       filterText={filterText}
  //     />
  //   );
  // }, [filterText, resetPaginationToggle]);
  const HandleClickApprove = (e) => {
    let leaveId = e.target.value;
  };
  const HandleClickNotApprove = (e) => {
    let leaveId = e.target.value;
  };

  const columns = [
    {
      name: "staff_id",
      selector: (row) => row.staff_id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.staff_name,
      sortable: true,
    },
    {
      name: "leave_reason",
      selector: (row) => row.leave_reason,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "leave_from",
      selector: (row) => moment(row.leave_from).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "leave_to",
      selector: (row) => moment(row.leave_to).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "applied_on",
      selector: (row) => moment(row.applied_on).format("YYYY-MM-DD"),
      sortable: true,
    },
    {
      name: "status",
      cell: (row) => (
       <>
          <div className="status_response">
          {row.status === 1 ? 
            <div className={"approve_btn"}>
              {" "}
              <button
                type="button"
                class="btn btn-success approve_btn"
                onClick={HandleClickApprove}
                value={row.id}s
              >
                APPROVED
              </button>
            </div> :
            <div className={"approve_btn"}>
              {" "}
              <button
                type="button"
                class="btn btn-danger approve_btn"
                onClick={HandleClickNotApprove}
                value={row.id}
              >
               REJECTED
              </button>
            </div>}
          </div>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  
  return (
    <div className="manageLeaves_page">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="dailyattendance_table">
              <h2>Manage Leaves</h2>

           <div>
            {/* <SearchSection
               labeltext={"StaffName"}
               inputtype={"text"}
               id="search"
               value={leavesList}
               onMonthChange={e => setFilterText(e.target.value)}
             /> */}
             </div>
              <div className="dailyattendance_table_box">
             
                <DataTable
                  pagination
                  highlightOnHover
                  pointerOnHover
                  defaultSortField="name"
                  columns={columns}
                  data={leavesList}
                  // subHeaderComponent={subHeaderComponent}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ManageLeaves;
