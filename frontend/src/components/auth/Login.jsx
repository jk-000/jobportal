import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import img from "../../assets/imglogin.png"

import "./authtoggle.css";
import { Mail, LockClosed } from "react-ionicons";
import { toast } from "react-toastify";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      } else{
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <>
    <Navbar />
    <section className="loginsection">
      <div class="wrapper">
        <img src={img} alt="Welcome Image" />
        <h2 class="welcomemsg text-right">Welcome</h2>
        <div class="form-wrapper login">
          <form onSubmit={submitHandler}>
            <h1 className="text-[#f2f2f2] text-4xl font-bold text-center">
              Sign In
            </h1>
            <div class="input-box">
              <span>
                <Mail cssClasses="icon" color="#f2f2f2" height="20px" />
              </span>
              <input
                type="text"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Email"
              />
            </div>
            <div class="input-box">
              <span>
                <LockClosed cssClasses="icon" color="#f2f2f2" height="20px" />
              </span>
              <input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Password"
              />
            </div>

            <div className="flex items-center justify-center">
              <RadioGroup className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-[15px] h-[15px] border-2 rounded-full border-gray-400 checked:bg-blue-500 checked:border-blue-500"
                  />
                  <Label htmlFor="r1" className="text-[#f2f2f2]">
                    Student
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer w-[15px] h-[15px] border-2 rounded-full border-gray-400 checked:bg-blue-500 checked:border-blue-500"
                  />
                  <Label htmlFor="r2" className="text-[#f2f2f2]">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {
                        loading ? <button className="btn mt-5"> Please wait </button> : <button type="submit" className="btn bg-[#f2f2f2] text-blue-600 mt-5">Sign In</button>
                    }
                    
                     
            <div class="sign-link">
              <p> 
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
            </div>
            <div className="sign-link">
                    <p>Forget Your Password? 
<a href="/forget-password"> Forget Password</a>
</p>
                    </div>
          </form>
        </div>
      </div>
    </section>
 
    </>
  );
};

export default Login;
