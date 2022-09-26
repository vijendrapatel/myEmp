import React from "react";
import { Route, Routes } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import EmpDashboardd from "../Empdashboard/empdashboard";
import EmpLogin from "../emplogin/emplogin";


function EmpDashboard(props) {
  let navigate = useNavigate();
  let Auth =  localStorage.getItem("authenticated");
  // console.log("local chala -- > "+Auth)
  return (
    <div>
      <Routes>
      <Route path="/emplogin" element={<EmpLogin/>} />
{Auth != 'success' ? navigate("/") :
<>

<Route path="/empdashboard" element={<EmpDashboardd/>} />
      <Route path="/emplogin" element={<EmpLogin/>} />
      


</>
}
      </Routes>
    </div>
  );
}

export default EmpDashboard;