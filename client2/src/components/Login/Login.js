import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CounterContext } from '../../context/CounterContext';
import pic from '../pics/profile-icon-png-910.jpg';
import {jwtDecode} from 'jwt-decode';  // Correct import
import './Login.css';

function Login() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let { user, setUser } = React.useContext(CounterContext);
  let navigate = useNavigate();

  async function onSubmit(formData) {
    console.log(formData);
    try {
      let res = await axios.post("http://localhost:3000/userapi/login", formData);
      if (res.data.message === 'Login successful') {
        let token = res.data.token;
        localStorage.setItem('token', token);
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        navigate("/mainpage");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert('An error occurred. Please try again later...');
    }
  }

  return (
    <div>

      <div className='flex mt-5 justify-center'>
      <img  className="w-[200px]" src="http://jaldhaara.org/wp-content/uploads/2022/04/jaldhaara-logo.png"  alt="Logo" />
      <p className='text-center text-3xl ms-3' >Donor Portal</p>
      </div>

    <div className="mt-5 flex items-center justify-center" >
      
      <div className="rounded-5" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <div className='pt-5 pb-5 rounded-t-xl m-auto ' style={{ backgroundColor: "#0B2B52" }}>
          <img className="w-[130px] m-auto" style={{ borderRadius: "50%" }} src={pic} alt="" />
        </div>
        <div className="w-[400px] m-auto">
          <form className="form rounded-b-xl text-white pt-2 pb-2 " onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: "#0B2B52" }}>
            <div className=" p-10 pt-0 text-dark">
              <input type="text" className="custom-input ms-1 ps-1 text-white" placeholder="Username"  {...register("username", { required: true })} />
              {errors.username?.type === 'required' && <p className="position-absolute pt-1 ps-1">Please enter Username</p>}
            </div>
            <div className=" p-10 pt-1 pb-3 text-dark">
              <input type="password" className="custom-input ms-1 ps-1 text-white" placeholder="Password"  {...register("password", { required: true })} />
              {errors.password?.type === 'required' && <p className="position-absolute pt-1 ps-1">Please enter password</p>}
            </div>
            <div className='mt-3 mb-4 flex justify-center'>
            <button className="btn   p-0  pb-1 px-3 text-light px" style={{backgroundColor:"#FC6D3F"}}>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
