import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";


import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import img from "../../assets/imglogin.png"

import "./authtoggle.css";
import { Mail, LockClosed } from "react-ionicons";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [input, setInput] = useState({
    password: "",
    
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useParams();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      
      const res = await axios.post(`${USER_API_END_POINT}/reset-password/${token.token}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      
      
      if (res) {
        
        navigate("/login");
        toast.success(res.data.message,{ duration: 10000 });
      }
    } catch (error) {
      console.log(error);
      
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  return (
    <>
    <Navbar />
    <section className="loginsection">
      <div class="wrapper">
        <img src={img} alt="Welcome Image" />
          <form onSubmit={submitHandler}>
            <h1 className="text-[#f2f2f2] text-4xl font-bold text-center">
              Reset Password
            </h1>
            <div class="input-box">
              <span>
                <Mail cssClasses="icon" color="#f2f2f2" height="20px" />
              </span>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Enter New Password"
              />
            </div>
       

            {
                        loading ? <button className="btn mt-5"> Please wait </button> : <button type="submit" className="btn bg-[#f2f2f2] text-blue-600 mt-5">Change Password</button>
                    }
       
          </form>
        </div>
     
    </section>
 
    </>
  );
};

export default ResetPassword;


