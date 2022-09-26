import React,{useState,useEffect} from "react";
// import { Button } from "react-bootstrap";
// import { Link } from 'react-router-dom';
// import Axios from "axios";
// import moment from "moment";
// import { useNavigate } from "react-router-dom";
// // var converter = require('number-to-words');
import ReactToPrint from 'react-to-print';
import Salary_slipp from "./Salary_slip";
function Salary_slip(props) {
   
  const idd = localStorage.getItem("staffid");
 
        //  words = converter.toWords(netsalary);
    return (
        <>
           <Salary_slipp ref={(response) => (this.componentRef = response)}/>

        <ReactToPrint
            content={() => this.componentRef}
            trigger={() => <button className="btn btn-primary">Print to PDF!</button>}
          />
        </>
    );
}

export default Salary_slip;
