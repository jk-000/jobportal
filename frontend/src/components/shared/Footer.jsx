import React from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-28 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-8">
          {/* About Section */}
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">JobHunt</h1>
            <p className="text-dark2">
              JobHunt bridges the gap between talented professionals and top
              organizations. Explore job opportunities, enhance your skills, and
              take the next step in your career.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Quick Links</h1>
            <div className="text-dark2">
              <ul className="space-y-2 text-lg">
                <li>
                  <Link
                    to="/"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/companies"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    Find Company
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Career Tips</h1>
            <div className="text-dark2">
              <ul className="space-y-2 text-lg">
                <li>
                  <Link
                    to="/career-tips/interview-tips"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    InterviewTips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-tips/resume-tips"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    ResumeTips
                  </Link>
                </li>
                <li>
                  <Link
                    to="/career-tips/gd-tips"
                    className="cursor-pointer hover:text-slate-600 duration-200"
                  >
                    GDTipsAndMocks
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Connect With Us</h1>
            <p className="text-dark2">
              Stay updated with the latest job opportunities and insights.
            </p>
            <div className="flex space-x-4 text-2xl text-dark2">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-secondary duration-200"
              >
                <FaLinkedin />
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl cursor-pointer hover:text-secondary duration-200"
              >
                <TbWorldWww />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-secondary duration-200"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-secondary duration-200"
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/9408770604"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer hover:text-secondary duration-200"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-12 pt-6 text-center text-dark2 text-sm">
          © {new Date().getFullYear()} JobHunt. All rights reserved.
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
