
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";




const Navbar = () => {


  const navigate = useNavigate();
    // Links for each role
    const studentLinks = [
      { name: "Home", link: "/" },
      { name: "Jobs", link: "/jobs" },
      { name: "Company", link: "/companies" },
      {
        name: "Career Tips",
        link: "#",
        subLinks: [
          { name: "Resume Tips", link: "/career-tips/resume-tips" },
          { name: "Interview Tips", link: "/career-tips/interview-tips" },
          { name: "GD Tips and Mocks", link: "/career-tips/gd-tips" },
        ],
      },
      { name: "About Us", link: "/aboutus" },
    ];
  
    const recruiterLinks = [
      
      { name: "Post Job", link: "/admin/jobs" },
      { name: "Register Company ", link: "/admin/companies" },
     
    ];
  
    const { user } = useSelector((store) => store.auth); // User data from Redux
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
  
    // Role-based Links
    const Links = user?.role === "recruiter" ? recruiterLinks : studentLinks;
  
    const logoutHandler = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setUser(null));
          toast.success(res.data.message);
          navigate("/")
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Logout failed");
      }
    };
  
    return (
      

    <div className="shadow-md w-full top-0 left-0 bg-white z-50">
  <div className="md:flex items-center justify-between py-4 px-7 md:px-10">
    {/* Logo Section */}
    <div className="font-bold text-2xl cursor-pointer flex items-center gap-1">
      <Link to="/">
        Job<span className="text-blue-600">Hunt</span>
      </Link>
    </div>

    {/* Menu Icon */}
    <div
      onClick={() => setOpen(!open)}
      className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
    >
      {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
    </div>

    {/* Navigation Links */}
    <ul
      className={`md:flex md:items-center md:static absolute z-50 bg-white w-full md:w-auto transition-all duration-500 ease-in-out ${
        open ? "top-16 pl-10 rounded-lg w-full" : "top-[-490px]"
      }`}
    >
      {Links.map((link, index) => (
        <li
          key={index}
          className="md:ml-8 my-7 md:my-0 relative"
          onClick={() => setDropdownOpen(dropdownOpen === link.name ? false : link.name)}
        >
          <div className="flex items-center gap-1 cursor-pointer text-gray-800 hover:text-blue-500 font-semibold">
            <Link to={link.link}>{link.name}</Link>
            {link.subLinks && <ChevronDownIcon className="w-5 h-5" />}
          </div>
          {dropdownOpen === link.name && link.subLinks && (
            <ul className="absolute bg-white shadow-md rounded w-40 z-50">
              {link.subLinks.map((subLink, subIndex) => (
                <li key={subIndex} className="px-4 py-2 hover:bg-blue-100 font-semibold">
                  <Link to={subLink.link}>{subLink.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}

      {/* Auth Buttons */}
      <li className="md:ml-8 my-7 md:my-0">
        {!user ? (
          <div className="md:flex hidden items-center gap-2">
            <Link to="/signup">
              <InteractiveHoverButton>Sign Up</InteractiveHoverButton>
            </Link>
          </div>
        ) : (
          <div className="hidden md:block">
            {/* Profile Avatar for Desktop */}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "Profile"} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600">
                    {user.role === "student" && (
                      <div className="flex items-center gap-2 mb-2">
                        <User2 />
                        <Link to="/profile" className="hover:underline">
                          View Profile
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut />
                      <button onClick={logoutHandler} className="hover:underline">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </li>
    </ul>
    

    {/* Profile Avatar for Mobile */}
    {user ? (
      <div className="md:hidden absolute right-16 mr-2 top-5">
        <div className="flex items-center gap-2">
        <span className="text-md font-medium">Hi, {user?.fullname}</span>
        <Popover>
          
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname || "Profile"} />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div>
              <div className="flex gap-2 mb-4">
                <Avatar>
                  <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                </div>
              </div>
              <div className="flex flex-col text-gray-600">
                {user.role === "student" && (
                  <div className="flex items-center gap-2 mb-2">
                    <User2 />
                    <Link to="/profile" className="hover:underline">
                      View Profile
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <LogOut />
                  <button onClick={logoutHandler} className="hover:underline">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        </div>
      </div>
    ):
    (<div className="md:hidden absolute right-16 mr-2 top-5">
      <Link to="/signup">
        <InteractiveHoverButton>Sign Up</InteractiveHoverButton>
      </Link>
    </div>)}
   
  </div>
</div>



    

    );
  };
  
  export default Navbar;
  
