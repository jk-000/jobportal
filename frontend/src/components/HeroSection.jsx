

// import React, { useState } from "react";
// import { Button } from "./ui/button";
// import { Search } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import { useNavigate } from "react-router-dom";
// import { GrUserWorker } from "react-icons/gr";
// import { FaBuilding, FaUsers, FaUserPlus, FaUpload, FaSearch, FaArrowRight } from "react-icons/fa";
// import { MdWork } from "react-icons/md";
// import CompanyHome from "./CompanyHome";
// import { motion } from "framer-motion"; // Importing Framer Motion

// const HeroSection = () => {
//   const [query, setQuery] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const searchJobHandler = () => {
//     dispatch(setSearchedQuery(query));
//     navigate("/browse");
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="bg-white min-h-screen flex flex-col items-center">
//         {/* Hero Text Section */}
//         <div className="max-w-screen-lg flex flex-row w-full text-left mt-16">
//           <motion.div
//             className="w-full lg:w-3/5 flex flex-col justify-center"
//             initial={{ x: -100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-4xl font-bold text-gray-800">
//               Find a job that suits <br />
//               your <span className="text-blue-500">interest</span> &{" "}
//               <span className="text-blue-500">skills</span>.
//             </h1>
//             <p className="text-gray-600 my-4 text-lg">
//               Find the perfect job that aligns with your passion. <br />
//               Take the first step toward a rewarding career today.
//             </p>
//             <div className="justify-left">
//               <div className="flex w-full shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 my-3">
//                 <input
//                   type="text"
//                   placeholder="Find your dream jobs"
//                   onChange={(e) => setQuery(e.target.value)}
//                   className="outline-none border-none w-full py-3 px-5 rounded-full"
//                 />
//                 <Button
//                   onClick={searchJobHandler}
//                   className="rounded-r-full bg-blue-500 py-6 px-5"
//                 >
//                   <Search className="h-6 w-8" />
//                 </Button>
//               </div>
//             </div>
//           </motion.div>
//           <motion.div
//             className="w-full lg:w-2/5 ml-auto lg:mt-0 flex justify-center items-center"
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 0.8 }}
//           >
//             <img
//               src="src/assets/homevector.png"
//               alt="Home Vector"
//               className="max-w-[400px] w-full"
//             />
//           </motion.div>
//         </div>

//         {/* Statistics Section */}
//         <motion.div
//           className="flex flex-wrap justify-center items-center mt-12 gap-6"
//           initial="hidden"
//           animate="visible"
//           variants={{
//             hidden: { opacity: 0, scale: 0.8 },
//             visible: { opacity: 1, scale: 1 },
//           }}
//           transition={{ duration: 0.8 }}
//         >
//           {[
//             {
//               label: "Live Job",
//               value: "17,899",
//               icon: <MdWork className="w-8 h-8 text-blue-500" />,
//             },
//             {
//               label: "Companies",
//               value: "973",
//               icon: <FaBuilding className="w-8 h-8 text-green-500" />,
//             },
//             {
//               label: "Candidates",
//               value: "15,690",
//               icon: <FaUsers className="w-8 h-8 text-purple-500" />,
//             },
//             {
//               label: "New Jobs",
//               value: "8,450",
//               icon: <GrUserWorker className="w-8 h-8 text-red-500" />,
//             },
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center bg-white border border-gray-300 shadow-lg rounded-lg p-6 w-48 text-center hover:bg-gray-200"
//               whileHover={{ scale: 1.1 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <div className="text-4xl mb-4">{stat.icon}</div>
//               <h2 className="text-xl font-bold text-gray-700">{stat.value}</h2>
//               <p className="text-gray-500">{stat.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         <CompanyHome />

//         {/* Steps Section */}
//         <div className="bg-gray-100 py-10 w-full">
//           <h2 className="text-center text-2xl font-semibold text-gray-800 mb-8">
//             How JobHunt works
//           </h2>
//           <div className="flex justify-center items-center gap-6 max-w-4xl mx-auto">
//             {[
//               {
//                 step: "Step 1",
//                 title: "Create account",
//                 description: "Create your account to start exploring job opportunities.",
//                 icon: <FaUserPlus size={24} />,
//               },
//               {
//                 step: "Step 2",
//                 title: "Upload CV/Resume",
//                 description: "Upload your CV to get noticed by potential employers.",
//                 icon: <FaUpload size={24} />,
//               },
//               {
//                 step: "Step 3",
//                 title: "Find suitable job",
//                 description: "Search for jobs that match your skills and interests.",
//                 icon: <FaSearch size={24} />,
//               },
//               {
//                 step: "Step 4",
//                 title: "Apply job",
//                 description: "Apply for the jobs you are interested in with ease.",
//                 icon: <FaArrowRight size={24} />,
//               },
//             ].map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-md"
//                 whileHover={{ scale: 1.1, rotate: 3 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="w-16 h-16 flex justify-center items-center rounded-full bg-blue-100 text-blue-600">
//                   {step.icon}
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-700 mt-4">
//                   {step.step} <br />
//                   {step.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 mt-2">{step.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default HeroSection;



import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logos = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS63iW-drx9mgYHjGG6LpPRka6417HbE2sFVg&s",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
     
        "https://i.ibb.co/TBh51x2/netflix.png",
        "https://i.ibb.co/DKS67bk/samsung.png",
        "https://i.ibb.co/nBcLnt3/spotify.png",
        "https://i.ibb.co/2q0Grhq/pngwing-com-9.png",
  ];

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <>
      
<div className="bg-white">
  <section className="py-6 sm:pb-16 lg:pt-2">
    <div className="container px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
      <div className="grid max-w-lg grid-cols-1 mx-auto lg:max-w-full lg:grid-cols-2 lg:items-center gap-y-12 lg:gap-x-16">
        {/* Left Side Animation */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl sm:leading-tight lg:leading-tight font-pj">
              Find Your Dream Job at Top Companies
            </h1>
            <p className="mt-2 text-lg text-gray-600 sm:mt-8 font-inter">
              Explore a wide range of job opportunities from top companies like
              Google, Microsoft, Apple, and many more.
            </p>

            <form
              onSubmit={searchJobHandler}
              className="relative mt-2 rounded-full sm:mt-12"
            >
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find Your Dream Job"
                  className="block w-full py-4 pl-14 pr-6 placeholder-gray-500 bg-white border border-black rounded-full sm:py-5 focus:ring-2 focus:ring-cyan-500"
                  aria-label="Search jobs"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 inset-y-1.5 px-5 py-3 text-sm font-semibold tracking-wide text-white bg-black rounded-full hover:opacity-90"
                >
                  Search Jobs
                </button>
              </div>
            </form>
          </div>

          <div className="flex items-center justify-center mt-10 space-x-6 sm:space-x-8 lg:justify-start">
            <div className="flex items-center">
              <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">
                3000+
              </p>
              <p className="ml-3 text-sm text-gray-900 font-pj">
                Total
                <br />
                Job Listings
              </p>
            </div>

            <div className="hidden sm:block">
              <svg
                className="text-gray-400"
                width="16"
                height="39"
                viewBox="0 0 16 39"
                fill="none"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.72265"
                  y1="10.584"
                  x2="15.7226"
                  y2="0.583975"
                ></line>
                <line
                  x1="0.72265"
                  y1="17.584"
                  x2="15.7226"
                  y2="7.58398"
                ></line>
                <line
                  x1="0.72265"
                  y1="24.584"
                  x2="15.7226"
                  y2="14.584"
                ></line>
                <line
                  x1="0.72265"
                  y1="31.584"
                  x2="15.7226"
                  y2="21.584"
                ></line>
                <line
                  x1="0.72265"
                  y1="38.584"
                  x2="15.7226"
                  y2="28.584"
                ></line>
              </svg>
            </div>

            <div className="flex items-center">
              <p className="text-3xl font-medium text-gray-900 sm:text-4xl font-pj">
                500+
              </p>
              <p className="ml-3 text-sm text-gray-900 font-pj">
                Total
                <br />
                Companies
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side Animation */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <img
            className="w-full"
            src="https://website-builderx-assets.s3.ap-south-1.amazonaws.com/Software_Engineer_8d2e4d736c.png?updated_at=2024-10-10T22:34:12.817Z"
            alt="Innovative Team Illustration"
          />
        </motion.div>
      </div>
    </div>
  </section>
</div>

      <section className="relative py-8 overflow-hidden bg-gray-50 sm:py-14 lg:py-14 xl:py-14">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 xl:grid-cols-2">
            {/* Text Section */}
            <div className="px-8 text-center xl:text-left xl:pr-16 md:max-w-2xl md:mx-auto xl:max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                Our Trusted Partners
              </h2>
              <p className="mt-6 text-lg font-normal text-gray-600 font-pj">
                These global leaders trust us to connect them with top talent.
              </p>
            </div>

            {/* Logos Section */}
            <div className="relative mt-8 sm:mt-12 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mt-0">
              <div className="absolute inset-16">
                <div
                  className="w-full h-full mx-auto rotate-180 opacity-30 rounded-3xl blur-lg filter"
                  style={{
                    background: `linear-gradient(
                      90deg,
                      #44ff9a -0.55%,
                      #44b0ff 22.86%,
                      #8b44ff 48.36%,
                      #ff6644 73.33%,
                      #ebff70 99.34%
                    )`,
                  }}
                ></div>
              </div>

              {/* Logos Grid */}
              <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-3 xl:grid-cols-3 space-y-5 xl:space-y-0">
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center px-6 py-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg w-44 md:w-full"
                  >
                    <img
                      className="w-auto h-8"
                      src={logo} // Directly using the logo link here
                      alt={logo-`${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b xl:bg-gradient-to-r from-transparent via-transparent to-gray-50"></div>
      </section>
    </>
  );
};

export default HeroSection;