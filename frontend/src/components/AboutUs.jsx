import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import aboutImage from '../assets/aboutimg.png'
import missionImage from '../assets/missionimg.png'
import CompanyHome from './CompanyHome'
function AboutUs() {

 
  return (
    <>
    <Navbar/>
    <div class="bg-white py-12">
      
  <div class="max-w-7xl mx-auto px-6  lg:px-8">
  <div className='text-center'>
            <h1 className='text-4xl font-semibold text-[#02203c] mb-4'>Welcome to our company!</h1>
            <h1 className='text-2xl text-[#02203c]'>Here's a glimpse of our work culture and team.</h1>
            <img 
                src={aboutImage} 
                alt="Team at work" 
                style={{ width: "100%", borderRadius: "10px" }} 
            />
        </div>

        <div className='flex justify-center'>
    <CompanyHome/>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ml-12 mb-12">
      <div>
        <h2 class="text-blue-600 text-lg font-semibold uppercase mb-4">Who we are</h2>
        <h1 class="text-4xl font-bold text-gray-900 mb-6 leading-snug">
          We’re a highly skilled and <br /> professionals team.
        </h1>
        <p class="text-gray-600 text-lg">
          Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam. Aliquam metus mauris, semper eu eros vitae, blandit tristique metus. Vestibulum maximus nec justo sed maximus.
        </p>
      </div>

      <div class="space-y-6">
        <div class="flex items-center">
          <div class="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m4 4H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-900">1,75,324</h3>
            <p class="text-gray-600">Live Job</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h11M9 21V3M17 16v5m4-5v5m-4-5h4m-8-5V3m0 4h6" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-900">97,354</h3>
            <p class="text-gray-600">Companies</p>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-1a3 3 0 00-2.824-2.995L19 16a4 4 0 10-6.824 2.995L12 19v1h5zM9 20h5v-1a3 3 0 00-2.824-2.995L12 16a4 4 0 10-6.824 2.995L5 19v1h4z" />
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-2xl font-bold text-gray-900">38,47,154</h3>
            <p class="text-gray-600">Candidates</p>
          </div>
        </div>
      </div>
    </div>



    <div className='flex justify-center'>
   
    </div>
   
    

        <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16">
      {/* Text Section */}
      <div className="max-w-xl lg:pr-12 flex flex-col gap-2">
        <h4 className="text-blue-500 text-lg font-semibold mb-2">Our Mission</h4>
        <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 leading-tight mb-6">
          Our mission is to help people to find the perfect job.
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          Praesent non sem facilisis, hendrerit nisi vitae, volutpat quam.
          Aliquam metus mauris, semper eu eros vitae, blandit tristique metus.
          Vestibulum maximus nec justo sed maximus.
        </p>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
        <img
          src={missionImage}
          alt="Our Mission Illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
   
  </div>
</div>
<Footer/>

    </>
  )
}

export default AboutUs