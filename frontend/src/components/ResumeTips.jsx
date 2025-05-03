import React from 'react';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const ResumeTips = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Resume Preparation Guidelines 
          <span className="text-blue-600"> (Updated on Jan 2025)</span>
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <ul className="list-disc pl-5 space-y-4 text-gray-700">
            <li>
              Use good quality paper for your resume. After all, you are describing your years of hard-earned education and experience. Always value yourself.
            </li>
            <li>
              Never send a badly duplicated photocopy of your resume. Even if you have to send a photocopy, ideally use a good copier and executive bond paper or other similar quality.
            </li>
            <li>
              Always remember to put your mobile number; if possible, give an alternate number.
            </li>
            <li>
              As a fresher, describe your academics and any workshops, internships, or seminars where you gained skills. Ideally display the knowledge you have. Present details point-wise and make them easy to understand.
            </li>
            <li>
              Ideally restrict your resume to one page. You should have content to talk about during your interview.
            </li>
            <li>
              Check for spelling errors and grammatical mistakes before taking a final copy of your resume. Even a small error could cause an embarrassing situation.
            </li>
            <li>
              Mention any awards or recognition earned during your academics.
            </li>
            <li>
              If you are a fresher, emphasize your education section and additional qualifications. Give a brief description of projects and extracurricular activities you undertook.
            </li>
            <li>
              Include sections like languages known, hobbies, interests, extracurricular activities, and your positive points in brief.
            </li>
            <li>
              Mention the exact time spent in each company supported by dates, and include the dates for completing each degree.
            </li>
            <li>
              Including a photograph on your resume is a good idea. While it's not mandatory, it can make your resume stand out.
            </li>
            <li>
              Select a simple font with an appropriate size to ensure clarity and legibility for your CV.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};



export default ResumeTips;
