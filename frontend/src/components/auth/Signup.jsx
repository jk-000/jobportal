import React, { useEffect, useState,useRef } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import './authtoggle.css';
import img from "../../assets/imglogin.png"
import { Mail,LockClosed,Person,Call,Image } from 'react-ionicons';
import './signup.css';
import { toast } from 'react-toastify'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const [fileName, setFileName] = useState("Select Profile Picture");
    const fileInputRef = useRef(null);

  const handleTextInputClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input's click
  };
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
      const file = e.target.files?.[0];
        setInput({ ...input, file  });
        setFileName(file.name);
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            console.log(res);
            
            if (res.data.success) {
              navigate("/login")
               toast.success(res.data.message);
               console.log(res);
               
            } else
            {
              toast.error(res.data.message);
              console.log(res);
              
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            dispatch(setLoading(false));
        }
        
        
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
      <>
        <Navbar />
            <section className="loginsection">
                  <div class="wrapper signupwrapper">
                    <img src={img} alt="Welcome Image"/>
                    <h2 class="welcomemsg text-right">Hello</h2>
                    <div class="form-wrapper login">
                      <form onSubmit={submitHandler}>
                        <h1 className="text-[#f2f2f2] text-4xl font-bold text-center mt-2">
                          Sign Up
                        </h1>
                
                    <div class="input-box mb-2">
                                  <span>
                                    <Person cssClasses="icon" color="#f2f2f2" height="20px" />
                                  </span>
                        <input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Name"
                            
                        />
                    
                    </div>
                    <div class="input-box my-2">
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
                    <div class="input-box my-2">
                                  <span>
                                    <Call cssClasses="icon" color="#f2f2f2" height="20px" />
                                  </span>
                        <input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Phone No."
                        />
                    </div>
                    <div class="input-box my-2">
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
                        <div class="input-box my-2">
                        <span>
                                    <Image cssClasses="icon" color="#f2f2f2" height="20px" />
                                  </span>
                        
                                  <input
        type="text"
        placeholder={fileName}
        readOnly
        className="border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
        onClick={handleTextInputClick}
      />
      <input
        type="file"
        accept="image/*"
        onChange={changeFileHandler}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
      
      
                    <div className='flex items-center justify-center'>
                        <RadioGroup className="flex items-center gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-[15px] h-[15px] border-2 rounded-full border-gray-400 checked:bg-blue-500 checked:border-blue-500"
                                />
                                <Label htmlFor="r1" className="text-[#f2f2f2]">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-[15px] h-[15px] border-2 rounded-full border-gray-400 checked:bg-blue-500 checked:border-blue-500"
                                />
                                <Label htmlFor="r2" className="text-[#f2f2f2]">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        
                    </div>
                    
                    {
                        loading ? <button className="btn mt-5"> Please wait </button> : <button type="submit" className="btn bg-[#f2f2f2] text-blue-600 mt-5">Signup</button>
                    }

<div class="sign-link m-2">
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
                    
                </form>
                </div>
      </div>
    </section>
   </>
            
    )
}

export default Signup