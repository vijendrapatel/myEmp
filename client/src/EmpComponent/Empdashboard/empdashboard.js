import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import moment from "moment";
import Axios from "axios";
import { SiEventbrite } from "react-icons/si";
import EmpHeader from "../common/EmpHeader";
import EmpSidebar from "../common/EmpSidebar";
import EmpSummarycard from "../common/EmpSummarycard";

const EmpDashboardd = () => {
  let navigate = useNavigate();
 
  const [attendancedata, setattendancedata] = useState();
  const [holidaycount, setholidaycount] = useState([]);
  const [currentmonth, setcurrentmonth] = useState(
    moment().format(`MMMM`)
  );
  const [attendmonth, setattendmonth] = useState(
    moment().format(`YYYY-MM-DDT00:00:00+00:00`)
  );

// date

let firstdate = moment(attendmonth, "YYYY-MM")
.startOf("month")
.format(`YYYY-MM-DDT00:00:00+00:00`);
let lastdate = moment(attendmonth, "YYYY-MM")
.endOf("month")
.format(`YYYY-MM-DDT00:00:00+00:00`);
// 

 // event
 const getEmployees = () => {
  Axios.get(
    `http://localhost:3001/holiday`
  ).then((response) => {
    setholidaycount(response.data);
  });
  Axios.get(
    `http://localhost:3001/attendancehistory/${firstdate}/${lastdate}`
  ).then((response) => {
    setattendancedata(response.data);
    // console.log(JSON.stringify(response.data))

  });
};
useEffect(() => {
  getEmployees();
}, []);
let hcount =[];
(holidaycount || []).map((hday)=>{
 return(
  (moment(hday.from_holiday_date).format('MMMM') === currentmonth ) ? 
  hcount.push(hday)
      : null
 )
})
let employeelength =attendancedata?.length

// sunday notification
  let startDate1 = moment().startOf('week').add(1, 'days').format('YYYY-MM-DD');
  var currentdate = moment().format('YYYY-MM-DD');

  var dayss = [];
 var sundayyy;
 var a=[];
  for (var i = 0; i <= 6; i++) {
    dayss.push(moment(startDate1).add(i, 'days').format('YYYY-MM-DD'));
    a.push(moment(dayss,'YYYY-MM-DD').add(i, 'days').format('dddd'))
  }
  a.map((sday)=>{
    if(sday == 'Sunday'){
      sundayyy = moment(sday,'dddd').add(7, 'days').format('YYYY-MM-DD');
        }
  })
  var difff = parseInt(moment(sundayyy).format('DD'))-parseInt(moment(currentdate).format('DD'));
// 
  return (
    <div className="empList_page">
      <EmpHeader />
      <div className="container-fluid">
        <div className="row">
          <EmpSidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
              <h1 className="h2">Dashboard</h1>
              
             
            </div>
            <EmpSummarycard employeenumb={employeelength} presentemployee={''} absentemployee={''}/>
            {/* notificatn */}
            <div className="row dashboard eventsection_box ">
            <div class="col-md-4 dashboard eventsection_body">
                <div class="card radius-10 border-start border-0 border-5 border-info">
                  <div class="card-body eventsection_cardbody">
                    <div class="d-flex align-items-center flex-column eventbox_dashboard">
                    {/*  */}
                    {/* sunday */}
                    <div class="col-md-12">
                <div class="card radius-10 border-start border-0 border-5 border-success">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h4 class="mb-0 text-dark">
                         <b>This Week Sunday</b> 
                        </h4>
                        <h4 class="my-1 text-success"> in {difff} days</h4>
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-success text-white ms-auto bg-success">
                        <i class="fa fa-dollar"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
{/* eventts */}
{(hcount || []).map((hcnt)=>{
return(
hcnt.from_holiday_date > currentdate ?

              <div class="col-md-12">
                <div class="card radius-10 border-start border-0 border-5 border-danger">
                  <div class="card-body">
                    <div class="d-flex align-items-center">
                      <div>
                        <h4 class="mb-0 text-dark">
                        <b>{hcnt.event} <b>({hcnt.discription})</b>  </b>  
                        </h4>
                        <h4 class="my-1 text-danger">{'From '}{moment(hcnt.from_holiday_date).format('DD-MMMM')}  {' To '}  {moment(hcnt.to_holiday_date).format('DD-MMMM')}</h4>
                        <h5 class="text-dark">
                        <b>
                     {'in  '} {parseInt(moment(hcnt.from_holiday_date).format('DD')) -parseInt(moment(currentdate).format('DD')) } 
                     {'  days'}
                     </b>
                     </h5> 
                      </div>
                      <div class="widgets-icons-2 rounded-circle bg-gradient-bloody text-white ms-auto">
                      <SiEventbrite/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
               : null
              )
})}
              {/*  */}
                      {/*  */}
                    </div>
                  </div>
                </div>
              </div>
              </div>
              {/*  */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboardd;
