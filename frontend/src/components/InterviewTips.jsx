import React from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const InterviewTips = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Campus Interview 
          <span className="text-blue-600"> (Updated on Jan 2025)</span>
        </h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-lg text-gray-700 mb-8">
          <strong className='text-xl'>Seven Commandments for Success in Campus Interviews:</strong>
        </h1>
          <p className="text-gray-700 mb-4">
            Campus Interview … Hmm… is what one looks forward to with enthusiasm, fear, and excitement towards the beginning of the final year.
          </p>
          <p className="text-gray-700 mb-6">
            For some, it's a make-or-break moment, and for others, a matter of pride. The constant thought in one's mind is - what shall make this click? What is it that the interviewer is looking for in me? Here's what we look for when we visit various campuses. While this is not an exhaustive list, it provides a good indication of expectations and ways to meet them.
          </p>
          <ul className="list-decimal pl-6 space-y-6 text-gray-700">
            <li>
              <strong>Know Thyself:</strong> Not everyone is good in every field. Each of us has our strengths and weaknesses, and that's okay. Focus on being a master in some areas, even if you’re not the jack of all trades. Simplify your resume, highlight your strengths, and be authentic.
            </li>
            <li>
              <strong>Testing What You Know and NOT What You Don’t:</strong> When given the opportunity to choose a subject, pick the one you are most confident in. Avoid selecting a difficult subject just to impress.
            </li>
            <li>
              <strong>Rack Your Brain - Analyze:</strong> Interviews also assess your ability to apply knowledge. Even if you don’t find the exact answer, your approach to problem-solving is critical. Stay calm and think through the problem.
            </li>
            <li>
              <strong>Ask for Help:</strong> If you’re stuck, ask the interviewer for a hint. They’re not there to grill you but to help bring out your best. Stay alert for clues, and don’t hesitate to seek help when necessary.
            </li>
            <li>
              <strong>What are your biggest accomplishments:</strong> Share your proudest achievements, even if they are part of a team effort. Mention what made you succeed and the lessons you learned.
            </li>
            <li>
              <strong>Be Calm, have Clear Verbal and Sound Non-Verbal Communication:</strong> Stay calm and composed during the interview. Ensure clarity in your verbal communication and maintain positive body language. Non-verbal cues like pauses, gestures, and expressions are equally important.
            </li>
            <li>
              <strong>Two-Way Exchange Process:</strong> Remember, an interview is a two-way process. Learn about the company, its culture, and job requirements. Use the interview as an opportunity to showcase your skills and evaluate if the company is a good fit for you.
            </li>
          </ul>
          <p className="text-gray-700 mt-6">
            An interview is your chance to present yourself and your skills in the best light. Make the most of it—you're the best person to showcase what you have to offer!
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default InterviewTips;
