import React from 'react';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const GDTipsAndMocks = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-blue-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          What is Group Discussion 
          <span className="text-blue-600"> (Updated on Jan 2025)</span>
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Group Discussion (GD) is a methodology or group activity used as a powerful tool to evaluate prospective candidates in various settings, including recruitment processes, academic assessments, and management competitions.
        </p>
        <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What is Group Discussion?</h2>
            <p className="text-gray-700">
              A GD evaluates whether candidates possess certain personality traits or skills desired by an organization. It involves a group of candidates discussing a given topic or situation within a set time, typically 15-20 minutes. The evaluation is conducted by experts based on the discussion, and a report is prepared.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Personality Traits Evaluated in GD:</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Communication skills</li>
              <li>Interpersonal skills</li>
              <li>Leadership skills</li>
              <li>Motivational skills</li>
              <li>Team-building skills</li>
              <li>Analytical and logical skills</li>
              <li>Reasoning ability</li>
              <li>Creative and different thinking</li>
              <li>Initiative and assertiveness</li>
              <li>Flexibility</li>
              <li>Ability to think on one’s feet</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why GDs are Commonly Used:</h2>
            <p className="text-gray-700">
              GDs help institutes and companies evaluate your ability to function as part of a team. They assess your interaction within a group, a crucial skill for teamwork in any organization. GDs are particularly significant for managers, as teamwork is essential to achieving organizational goals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Watch This Video for Tips</h2>
            <div className="aspect-w-16 aspect-h-9 flex justify-center">
            <iframe className='w-full md:h-96 xs:h-[200px]' src="https://www.youtube.com/embed/HmdHeZHTuqY" title="WHY AND HOW TO INITIATE AND CONCLUDE A GD-TIPS AND TRICKS - Group Discussion" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          </section>
          


          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company's Perspective:</h2>
            <p className="text-gray-700 mb-4">
              Companies use GDs to assess candidates on several aspects, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>
                <strong>Interactive Skills:</strong> How well you communicate with others.
              </li>
              <li>
                <strong>Behavior:</strong> Openness to views contrary to your own.
              </li>
              <li>
                <strong>Participation:</strong> Activeness as a speaker and attentiveness to the discussion.
              </li>
              <li>
                <strong>Contribution:</strong> Balancing group objectives with individual input.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Aspects of a Group Discussion:</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Verbal communication</li>
              <li>Non-verbal behavior</li>
              <li>Conformance to norms</li>
              <li>Decision-making ability</li>
              <li>Cooperation</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Strive to embody these aspects to excel in any group discussion.
            </p>
          </section>

          <p className="text-lg font-medium text-blue-600">
            JobHunt wishes you all the best in your Group Discussion!
          </p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default GDTipsAndMocks;
