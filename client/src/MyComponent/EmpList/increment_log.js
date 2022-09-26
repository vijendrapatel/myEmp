import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/salary/Generatesalary.css';
import moment from 'moment';
const IncrementLog = () => {
 let navigate = useNavigate();
  const idd = localStorage.getItem('newstaffid');
  const sname =localStorage.getItem('newstaff_name');
  const salary =localStorage.getItem('oldsalary');
  const [oldsalary, setoldsalary] = useState("");
  const [newsalary, setnewsalary] = useState("");
  const [appliedon, setappliedon] = useState("");
  const [apicall, setapicall] = useState(false);


  
 

  const addincrementDetails = () => {
    // if (!oldsalary) {
    //   toast("Please Enter the name", {
    //     position: "top-center",
    //     autoClose: 5000,
    //   })
    //   return false;
    // }
    if (!newsalary) {
      toast("Please Enter the Date of Birth", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (appliedon.length === 0) {
      toast("Please Enter the Gender", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
  
  //  const getincrement = () => {
  Axios.post("http://localhost:3001/incrementlogcreate", {
      staff_id:idd,
      staff_name: sname,
      old_salary:salary,
      new_salary: newsalary,
      applied_on:appliedon,
       }).then((response) => {
    });
    Axios.post(`http://localhost:3001/updatee`, {
      id: idd,
      salary:newsalary
    }).then((response) => {
      console.log("++++++++++--------++++++"+JSON.stringify(response))
    });
  }
  // };
  // useEffect(() => {
  //   getincrement()
  // }, []);
    
  

  // const nameOnchange = (e) => {
  //   setName(e.target.value)
  // }
  const oldonChange = (e) => {
    setoldsalary(e.target.value)
  }
  const newonChange = (e) => {
    setnewsalary(e.target.value)
  }
  const appliedonChange = (e) => {
    setappliedon(e.target.value)
  }
return (
    <div className="addemployee_box">
      <ToastContainer />
      <div className="addemployee_box_row">
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
        
          <div class="container_fluid">
            


            <div class="row ">

                    <div class="container">

                      <form id="contact-form" role="form">
                        <div class="controls">
                            <h5 class="mt-4"><b>Increment Log</b></h5>
                            <div class="row">
                              <div class="col-md-4">
                                <div class="form-group">
                                  <label for="form_name">Old Salary*</label>
                                  <input id="form_name" type="text" name="name" class="form-control" placeholder="" required="required" 
                                  value={salary} onChange={oldonChange} />

                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <label for="form_lastname">New Salary *</label>
                                  <input id="form_lastname" type="text" name="surname" class="form-control" placeholder="" required="required" 
                                   onChange={newonChange}/>

                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="form-group">
                                  <label for="form_lastname">Applied on*</label>
                                  <input id="form_lastname" type="date" name="surname" class="form-control" placeholder="" required="required"
                                   onChange={appliedonChange} />

                                </div>
                              </div>
                              </div>

                          <div class="row mt-4">

                            <div class="col-md-4 mt-3">

                              <button type="button" class="btn btn-primary btn-send  pt-2 btn-block" onClick={addincrementDetails}>Submit</button>

                            </div>


                          </div>


                        </div>
                      </form>

                 
                 
            </div>
            </div>
          </div>


        </main>

      </div>
    </div>
  );
}
export default IncrementLog;
