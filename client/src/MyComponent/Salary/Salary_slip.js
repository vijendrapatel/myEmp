import React,{useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import Axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactToPrint from 'react-to-print';
import fileDownload from 'js-file-download'
var converter = require('number-to-words');
// import { ToWords } from 'to-words';

function Salary_slip(props) {
    // const toWords = new ToWords();
  const idd = localStorage.getItem("staffid");
  const deductionamt = localStorage.getItem("deduction");
  const [employeeList, setEmployeeList] = useState([]);
  const [bankdetail, setbankdetail] = useState([]);
  const [attendancedata, setattendancedata] = useState([]);
  const [holidaycount, setholidaycount] = useState([]);
  const [salaryList, setsalaryList] = useState([]);
  const [lc, setlc] = useState();
  const [hd, sethd] = useState();
  const [cl, setcl] = useState();
  const [el, setel] = useState();
  const [ia, setia] = useState();
  const [ua, setua] = useState();
  const [ml, setml] = useState();
  const [wday, setwday] = useState();

    const [attendmonth, setattendmonth] = useState(
        moment().format(`YYYY-MM-DDT00:00:00+00:00`)
      );
  
    
      // date
     
      let momentmonth = moment(attendmonth, "YYYY-MM").daysInMonth();
    
      let firstdate = moment(attendmonth, "YYYY-MM")
        .startOf("month")
        .format(`YYYY-MM-DDT00:00:00+00:00`);
      let lastdate = moment(attendmonth, "YYYY-MM")
        .endOf("month")
        .format(`YYYY-MM-DDT00:00:00+00:00`);
    const getEmployees = () => {
       
        Axios.get(`http://localhost:3001/bankdetails/${idd}`).then((response) => {
            if(response.data[0] != null || response.data[0] != 'undefined' || response.data[0] != '' || response.data[0] != 'null'|| response.data[0] != undefined ){
                setbankdetail(response.data[0]);
            }
            {
                setbankdetail('');
            }
        });
        Axios.get(`http://localhost:3001/attendancehistoryy/${firstdate}/${lastdate}/${idd}`
        ).then((response) => {
    sethd(response.data[0].HD);
    setlc(response.data[0].LC);
    setattendancedata(response.data[0]);
    setcl(response.data[0].CL);
    setml(response.data[0].ML);
    setel(response.data[0].EL);
    setia(response.data[0].IA);
    setua(response.data[0].UA)
  
       
        });
   
        Axios.get(`http://localhost:3001/getholiday/${firstdate}/${lastdate}`
        ).then((response) => {
          setholidaycount(response.data[0]);
          let wdays = momentmonth -  response.data[0].count;
          setwday(wdays)
        });
        Axios.get(`http://localhost:3001/employeeDetail/${idd}`).then((response) => {
          setEmployeeList(response.data[0]);
        });
     
      };
      useEffect(() => {
        getEmployees();
      }, []);

    //   salary deduction
    let netsalary;
    let deductionn;
    let GrossEarnings;
    let onedaysal;
    let absent;
    let leave;
    let medicalleave;
    let emergencyleave;
    let halfday;
    
    onedaysal = (employeeList.salary / (wday))
   
    absent =((onedaysal) * 3 * (ua))
   
    leave = (onedaysal * 1 * (ia))
    medicalleave = (onedaysal * 1 * (ml))
    emergencyleave = (onedaysal * 1 * (el))
   halfday = ((onedaysal/2) * 1 * (hd))
   let latecom;
  
   if(lc>2){
     let diff = lc - 2 
     if(diff == 1){
       latecom = 0
       }
       if(( diff % 3 == 0  && diff % 2 == 0) || diff % 3 == 0){
           latecom = (diff/3) * onedaysal
       }
       {
         if(diff % 2 == 0 && diff % 3 !== 0){
           latecom = (diff/4) * onedaysal
           }  
       }
    }
    if(lc<2){
        latecom=0;
      }
         deductionn =absent + leave+ medicalleave+ emergencyleave+halfday+latecom;
        GrossEarnings=(employeeList.salary) 
         netsalary = (GrossEarnings) -  (deductionn);
         var words;
          words = converter.toWords[(netsalary)];



    return (
        <>
       
            <div class="container mt-5 mb-5">
                <div class="row">
                    <div class="col-md-9 mx-auto">
                        <div class="text-center lh-1 mb-2">
                            <h6 class="fw-bold">Payslip</h6> <span class="fw-normal">Payment slip for the month of August 2022</span>
                        </div>
                        <div class="d-flex justify-content-end"> <span><b>Working Branch:</b>We2code Technology</span> </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">EMP Id:</span> <small class="ms-3">{employeeList.id}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">EMP Name:</span> <small class="ms-3">{employeeList.staff_name}</small> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">Designation and Department:</span> <small class="ms-3">{employeeList.department_id}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">Payment Month:</span> <small class="ms-3">{moment(bankdetail.added_on).format('YYYY-MMMM')}</small> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                            <div> <span class="fw-bolder">Name of Bank:</span> <small class="ms-3">{bankdetail.bank_name}</small> </div>
                        </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">Mode of Payment:</span> <small class="ms-3">Online</small> </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">Date of Payment:</span> <small class="ms-3">{moment(bankdetail.added_on).format('YYYY-MMMM-DD')}</small> </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div> <span class="fw-bolder">Ac No.:</span> <small class="ms-3">{bankdetail.account_no}</small> </div>
                                    </div>
                                </div>
                            </div>
                            <table class="mt-4 table table-bordered salarysliptable">
                                <thead class="bg-dark text-white">
                                    <tr>
                                        <th scope="col">Desciption</th>
                                        <th scope="col">Earnings</th>
                                        <th scope="col">Deductions</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Basic</th>
                                        <td>{employeeList.salary}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">Dearness Allowance</th>
                                        <td>{salaryList.allowance}</td>
                                        <td colspan="2"> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">House Rent Allowance</th>
                                        <td>{salaryList.allowance} </td>
                                        <td colspan="2"> </td>
                                    </tr>

                                    <tr>
                                        <th scope="row">Sales Incentive</th>
                                        <td>{salaryList.allowance}</td>
                                        <td colspan="2"> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">Leave Encashment</th>
                                        <td>{salaryList.allowance}</td>
                                        <td colspan="2"> </td>



                                    </tr>
                                    <tr>
                                        <th scope="row">Holiday Wages</th>
                                        <td>{salaryList.allowance}</td>
                                        <td colspan="2"> </td>


                                    </tr>
                                    <tr>
                                        <th scope="row">Special Allowance</th>
                                        <td>{salaryList.allowance}</td>
                                        <td colspan="2"> </td>



                                    </tr>
                                    <tr>
                                        <th scope="row">PF</th>
                                        <td></td>
                                        <td colspan="2">{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> ESI</th>
                                        <td></td>
                                        <td colspan="2">{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> Professional Tax</th>
                                        <td></td>
                                        <td colspan="2">{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Other</th>
                                        <td></td>
                                        <td colspan="2">{salaryList.tax}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Absent</th>
                                        <td></td>
                                        <td colspan="2">{absent}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Leave</th>
                                        <td></td>
                                        <td colspan="2">{leave}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> Late Comings</th>
                                        <td></td>
                                        <td colspan="2">{latecom}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"> Half Day </th>
                                        <td></td>
                                        <td colspan="2">{halfday}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">CL</th>
                                        <td></td>
                                        <td colspan="2">{'0'}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">ML</th>
                                        <td></td>
                                        <td colspan="2">{medicalleave}</td>
                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row">Total</th>
                                        <td>{GrossEarnings}</td>
                                        <td colspan="2">{deductionamt}</td>

                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row">Gross Earnings(A)</th>
                                        <td></td>
                                        <td colspan="2">{GrossEarnings}</td>

                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row">Gross Deduction(B)</th>
                                        <td></td>
                                        <td colspan="2">{deductionamt}</td>


                                    </tr>
                                    <tr class="border-top">
                                        <th scope="row">Net Salary Payable(A-B)</th>
                                        <td>{netsalary}</td>
                                        <td colspan="2"></td>


                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-md-4"> <br /> <span class="fw-bold">Net Pay : {netsalary}</span> </div>
                            <div class="border col-md-8 mt-2">
                                <div class="d-flex flex-column"> <span>In Words</span> <span><b>{words} only</b></span> </div>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <Link to='/Salary_list' className="nav-link">

                                <Button>Home</Button>
                            </Link>
                            <a href={'/Salary_slip'} download = {'/Salary_slip.pdf'}>

                            <Button >Download</Button>
</a>
                        </div>
                        <div class="d-flex justify-content-end">
                            <div class="d-flex flex-column mt-2"><span class="mt-4">Regards</span> <span class="fw-bolder">We2code Technology</span>  </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Salary_slip;
