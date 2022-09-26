import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { RingLoader } from  'react-spinners'

const EmpLogin = () => {
  let navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [Message, setMessage] = useState("");
  const [mail, setmail] = useState("");
  const [pass, setpass] = useState("");

  Axios.defaults.withCredentials = true;

  const onSubmit = () => {
  
     if(pass.length === 0){
      toast("Please Enter the Password",{
        position: "top-center",
        autoClose: 3000,
        });
      return false;
     }

      Axios.post('http://localhost:3001/emplogin', {mail,pass,}).then((response) => {
        setauthenticated(response.data.message)
     
        toast(response.data.message,{
          position: "top-center",
          autoClose: 5000,
      });
         
          if (response.data.message === 'success') {
            localStorage.setItem("authenticated",response.data.message);
            navigate('/empdashboard');
          }
          else {
          }
      });
  };
  console.log("authenticated   --- > "+authenticated)
  const emailOnchange=(e)=>{
    setmail(e.target.value)
    }
    const passwordOnchange=(e)=>{
      setpass(e.target.value)
    }

    return (
      <>
      <ToastContainer/>
        <div className='login_container'>
      <div className='login_section' >
      
 <div className='signin_logo'><RingLoader color="#31eba8" /> <h3>Sign In</h3></div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={mail}
            onChange={emailOnchange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={pass}
            onChange={passwordOnchange}
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success submit_btn" onClick={onSubmit} >
            Submit
          </button>
        </div>
       
      </div>
      </div>
      </>
    )
  }

  export default EmpLogin;