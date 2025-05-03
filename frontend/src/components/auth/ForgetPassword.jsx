import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";


import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import img from "../../assets/imglogin.png"

import "./authtoggle.css";
import { Mail, LockClosed } from "react-ionicons";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [input, setInput] = useState({
    email: "",
    
  });
  const { loading, user } = useSelector((store) => store.auth);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/forget-password`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res) {
        
        navigate("/");
        toast.success(res.data.message,{ autoClose: 10000 });
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
              Forget Password
            </h1>
            <div class="input-box">
              <span>
                <Mail cssClasses="icon" color="#f2f2f2" height="20px" />
              </span>
              <input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Email"
              />
            </div>
       

            {
                        loading ? <button className="btn mt-5"> Please wait </button> : <button type="submit" className="btn bg-[#f2f2f2] text-blue-600 mt-5">Forget Password</button>
                    }
       
          </form>
        </div>
     
    </section>
 
    </>
  );
};

export default ForgetPassword;
