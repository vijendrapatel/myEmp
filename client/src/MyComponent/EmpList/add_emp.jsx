/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Axios from 'axios';
import Sidebar from '../common/Sidebar';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import '../../styles/salary/Generatesalary.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Bankdetails from './bankdetails';
import IncrementLog from './increment_log';
import axios from 'axios';
import Documentupload from './document_upload';


const AddEditEmp = (props) => {
  
 
  let navigate = useNavigate();
  const [depart, setdepart] = useState([]);
  const [departmentdata, setdepartmentdata] = useState([]);
  const [name, setName] = useState("");
  const [Dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setaddress] = useState("");
  const [city, setCity] = useState("");
  const [citydata, setCitydata] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [doj, setDoj] = useState("");
  const [state, setState] = useState("");
  const [statedata, setstatedata] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [qualification, setqualification] = useState("");
  const [experience, setexperience] = useState("");
  const [altno, setaltno] = useState("");
  const [skill, setskill] = useState("");
  const [status, setstatus] = useState(0);
  const [salary, setsalary] = useState();
  const [stateId, setStateId] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  
  const addEmployee = async () => {
   
    if (!name) {
      toast("Please Enter the name", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (!Dob) {
      toast("Please Enter the Date of Birth", {
        position: "top-center",
        autoClose: 5000,
      })
      return false;
    }
    if (gender.length === 0) {
      toast("Please Enter the Gender", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (address.length === 0) {
      toast("Please Enter the address", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (email.length === 0) {
      toast("Please Enter the email", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (mobile.length === 0) {
      toast("Please Enter the mobile Number", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (doj.length === 0) {
      toast("Please Enter the Date of Joining", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    
    if (city.length === 0) {
      toast("Please Enter the city", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (state.length === 0) {
      toast("Please Enter the state", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    if (country.length === 0) {
      toast("Please Enter the country", {
        position: "top-center",
        autoClose: 5000,
      });
      return false;
    }
    localStorage.setItem("newstaff_name",name)
    localStorage.setItem("oldsalary",salary)

   

   
       

  
      
    Axios.post("http://localhost:3001/create",{
      
      staff_name: name,
      dob: Dob,
      gender: gender,
      address: address,
      email: email,
      mobile: mobile,
      doj: doj,
      city: citydata,
      state: statedata,
      country: country,
      department_id: departmentdata,
      qualification:qualification,
      experience:experience,
      alternate_no:altno,
      skills:skill,
      status:status,
      salary:salary,
    
      headers: { "Content-Type": "multipart/form-data"}
    })
    
    .then(async (response) => {
      // console.log("------response.data" + JSON.stringify(response.data.insertId))
      localStorage.setItem("newstaffid",response.data.insertId)
      let id = response.data.insertId;
      const formData = new FormData();
      formData.append("image", file);
      formData.append("fileName", fileName);
      console.log("formdata - ----> "+JSON.stringify(formData))
      try {
       Axios.post(
          `http://localhost:3001/upload/${id}`,
         formData,
        );
      } catch (ex) {
        console.log(ex);
      }
      // console.log("---------------------------------------"+(`insertId`))
        //  navigate("/Bankdetails");
    });
  alert("Data is saved successfully")
}

  const department = () => {
    Axios.get("http://localhost:3001/department").then((response) => {
      setdepart(response.data);
    });
  };

  const getStates = () => {
    Axios.get("http://localhost:3001/state").then((response) => {
      setState(response.data);
     
    });
  };
  const getCity = () => {
    Axios.get(`http://localhost:3001/city/${stateId}`).then((response) => {
      setCity(response.data);
    
    });
  };
 
  useEffect(() => {
    department();
    getStates();
  }, []);
  useEffect(() => {
    getCity();
  }, [stateId]);

// console.log("))))______________"+state)
  const nameOnchange = (e) => {
    setName(e.target.value)
  }
  const dobOnchange = (e) => {
    setDob(e.target.value)
  }
  const genderOnchange = (e) => {
    setGender(e.target.value)
  }
  const addressOnchange = (e) => {
    setaddress(e.target.value)
  }
  const cityOnchange = (e) => {
    setCitydata(e.target.value)
    console.log("city.........."+citydata)
  }
  const countryOnchange = (e) => {
    setCountry(e.target.value)
  }
  const emailOnchange = (e) => {
    setEmail(e.target.value)
  }
  const mobileOnchange = (e) => {
    setMobile(e.target.value)
  }
  const dojOnchange = (e) => {
    setDoj(e.target.value)
  }

  const departOnchange = (e) => {
    setdepartmentdata(e.target.value)
  }
  const stateOnchange = (e) => {
    let arr = e.target.value.split(',')
    setstatedata(arr[0])
    setStateId(arr[1])
    getCity();
  }

  const statusOnchange = (e) => {
    if (e.target.checked) {
     
      setstatus(1)
    } else {
      setstatus(0)

    }
  };
  console.log('checked or not - '+ status);
 

  //   setstatus(e.target.value)
  //   console.log(e.target.value)
  // }

  const qualificationOnchange = (e) => {
    setqualification(e.target.value)
  }
  const alternatenoOnchange = (e) => {
    setaltno(e.target.value)
  }
  const expOnchange = (e) => {
    setexperience(e.target.value)
  }
  const skillOnchange = (e) => {
    setskill(e.target.value)
  }
 

  const salaryOnchange = (e) => {
    setsalary(e.target.value)
    console.log("------"+e.target.value)
  }
  return (
    <>
    {/* <div className="App">
    <input type="file" onChange={saveFile} name={'image'} />
    <button onClick={uploadFile}>Upload</button>
  </div> */}

    <div className="addemployee_box">
      <ToastContainer />
      <Header />
      <div className="addemployee_box_row">

        <Sidebar className='sidebar_add_emp' />
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div className='detail_side_heading'>
          </div>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 className="h1"><b>Add Employee</b></h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group mr-2">
                <Link to="/AttendanceHistory" className="nav-link">
                  <button className="btn btn-sm btn-outline-secondary">
                    Attendance History
                  </button>
                </Link>
                <button className="btn btn-sm btn-outline-secondary">
                  Salary History
                </button>
              </div>
            </div>
          </div>


          <div class="container_fluid">

<Tabs>
    <TabList>
      <Tab>Personal Details</Tab>
      <Tab>Bank Details</Tab>
      <Tab>Increment Details</Tab>
      <Tab>Document Upload</Tab>


    </TabList>

    <TabPanel >
    <div class="row ">

{/* <div class="container"> */}
{/* <form id="contact-form" role="form" method="post" action="/" enctype="multipart/form-data"> */}
  <div class="controls">
    <h5 class="mt-4"><b>Personal Details-</b></h5>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="form_name">Name of Employee *</label>

          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Name"
              aria-label="Username" aria-describedby="basic-addon1"
              onChange={nameOnchange} />
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="form_name">Date of Birth *</label>

          <div class="input-group mb-3">
            <input type="date" class="form-control" placeholder="Name"
              aria-label="Username" aria-describedby="basic-addon1"
              onChange={dobOnchange} />
          </div>
        </div>
      </div>


      <div class="col-md-4">
        <div class="form-group">
          <label for="form_lastname">Gender*</label>

          <div class="input-group mb-3">

            <select onChange={genderOnchange} className={"dept"}>Select
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </select>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="form_name">Qualification*</label>

          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder=""
              aria-label="Username" aria-describedby="basic-addon1"
              onChange={qualificationOnchange} />
          </div>
        </div>
      </div>
      <div class="col-md-4">

        <div class="form-group">
          <label for="form_lastname">Mobile*</label>

          <input type="number" class="form-control" placeholder="Mobile no."
            onChange={mobileOnchange} />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label for="form_lastname">Residence Phone No.</label>

          <input type="number" class="form-control" placeholder=""
            onChange={alternatenoOnchange} />
        </div>
      </div>
    </div>
  </div>


  <div class="row mt-4">
   
    
    <div class="col-md-4">
      <div class="form-group">
        <label for="form_lastname">Country*</label>
        <select onChange={countryOnchange} className={"dept"}>Country
        <option value={''}>Select</option>

        <option value={'India'}>India</option>
         </select>
        </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="form_lastname">State*</label>
       
        <select onChange={stateOnchange}  className={"dept"}>Select
                    <option>State</option>
                    {(state || []).map((statedata) => (
                      <option value={[statedata.state,statedata.id]}
                       >{statedata.state}</option>
                    ))}
                  </select>
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="form_name">City *</label>
        <select onChange={cityOnchange} className={"dept"}>Select
                    <option>City</option>
                    {(city || []).map((citydata) => (

                      <option value={citydata.city_name}>{citydata.city_name}</option>

                    ))}
         </select>
      </div>
    </div>
  </div>
<div class="row mt-4">
    <div class="col-md-4">
      <div class="form-group">

        <label for="form_name">Address *</label>

        <textarea type="text" class="form-control" onChange={addressOnchange} />
      </div>
    </div>

    <div class="col-md-4">
      <div class="form-group">
        <label for="form_name">Email *</label>

        <input type="email" class="form-control" placeholder="Email"
          aria-label="email" aria-describedby="basic-addon1"
          onChange={emailOnchange} />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="form_name">Skills</label>

        <input type="text" class="form-control" placeholder="Skills"
          aria-label="email" aria-describedby="basic-addon1"
          onChange={skillOnchange} />
      </div>
    </div>
   
  </div>
<div className='row mt-4'>
    <h4><b>Job Details-</b></h4>
    <div class="col-md-4">

      <div class="form-group">
        <label for="form_lastname">Experience *</label>

        <input type="text" class="form-control" placeholder="job experience"
          aria-label="Date of joining" aria-describedby="basic-addon1"
          onChange={expOnchange} />
      </div>
    </div>
    <div class="col-md-4">

      <div class="form-group">
        <label for="form_lastname">Date of joining *</label>

        <input type="date" class="form-control" placeholder="Date of joining"
          aria-label="Date of joining" aria-describedby="basic-addon1"
          onChange={dojOnchange} />
      </div>
    </div>
    <div class="col-md-4">
      <div class="form-group">
        <label for="form_lastname">Department *</label>
        <select onChange={departOnchange} className={"dept"}>Select
          <option>Department</option>
          {(depart || []).map((depart) => (

            <option value={depart.id}>{depart.department_name}</option>

          ))}
        </select>
      </div>
    </div>

  </div>

  <div class="row mt-4">

    <div class="col-md-4 mt-3">
      <div class="form-group">
   
      <label for="form_name">Choose File *</label>

        <input type="file" name="image" class="form-control " onChange={saveFile} />
       
      </div>
     
      
    </div>

    <div class="col-md-4 mt-3">
      <div class="form-group">
      <label for="form_name">Salary*</label>

        <input type="number" name="" accept='' class="form-control " onChange={salaryOnchange} />
      </div>
    </div>

    <div class="col-md-4 mt-3">
      <div class="form-group">
    <label for="form_name">Status *</label>

       <div className='status_check'>
          
           <input type="checkbox" onChange={statusOnchange} value={status?1:0}/>
          
          <span>Active</span>
</div>

          

        
      </div>
    </div>
    </div>
  <div class="col-md-3 mt-3">
 <button type="button" class="btn btn-primary btn-send  pt-2 btn-block" onClick={addEmployee}>Add Employee</button>
</div>
{/* </form> */}



</div>
    </TabPanel>
    <TabPanel >
      <Bankdetails/>
    </TabPanel>
    <TabPanel>
      <IncrementLog/>
    </TabPanel>
    <TabPanel>
      <Documentupload/>
    </TabPanel>
  </Tabs>
 </div>
</main>
 </div>
    </div>
    </>
  );
}

export default AddEditEmp;
