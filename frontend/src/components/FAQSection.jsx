import React, { useState } from "react";

const FAQSection = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqs = [
    {
      question: "How to boost productivity at work?",
      answer: "Making your workday more productive can lead to better results. Here are some tips: Focus on prioritizing tasks, avoid distractions, and take short breaks to stay refreshed.",
    },
    {
      question: "What are the best resources to prepare for job interviews?",
      answer: "There are several excellent resources, including mock interview platforms, books like 'Cracking the Coding Interview,' and professional mentorship programs.",
    },
    {
      question: "How to create an impressive resume for a job application?",
      answer: "Tailor your resume to the job description, highlight key achievements, and ensure it is well-structured and error-free. Use action verbs to describe your experiences.",
    },
    {
      question: "How to maintain a healthy work-life balance while job hunting?",
      answer: "Set dedicated times for job searching, make time for hobbies and relaxation, and stay organized with a schedule to avoid burnout.",
    },
  ];

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
            Got Questions? We've Got Answers!
          </h2>
          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
            Need help navigating your career? Check out our frequently asked questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                onClick={() => toggleQuestion(index)}
              >
                <span className="text-lg font-semibold text-black">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-gray-400 transform ${openQuestion === index ? "rotate-180" : "rotate-0"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openQuestion === index && (
                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default FAQSection;
