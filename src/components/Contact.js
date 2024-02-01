import React from "react";
import my from "../image/my.png";
import { FaGithub } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { FaFileCircleCheck } from "react-icons/fa6";
import { motion } from "framer-motion";
import Section from "../Animation.js/Section";

export default function Contact() {
  return (
    <div className="my-40 lg:my-1 lg:p-16 items-center space-y-12 lg:flex lg:space-x-14 m-auto justify-center h-screen  lg:w-3/5 text-3xl lg:text-4xl text-slate-500  ">
      <div className=" justify-center align-middle items-center first-letter: lg:flex lg:gap-16">
        <div className=" flex items-center justify-center p-10 h-auto m-auto ">
          <Section>
            <img className="items-center  rounded-3xl" src={my} alt="MyImage" />
          </Section>
        </div>

        <div className="  items-center h-auto m-auto flex flex-col">
          <Section>
            <div className=" h-auto m-auto space-y-4 flex flex-col">
              <a
                className="cursor-pointer flex space-x-5"
                href="https://github.com/FIREsingh"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
                <h1 className=" text-blue-400 flex space-x-10">GitHub</h1>
              </a>
              <a
                className=" cursor-pointer flex space-x-5"
                href="https://linkedin.com/in/manishsinghaithani"
                target="_blank"
                rel="noreferrer"
              >
                <BsLinkedin />
                <h1 className=" text-blue-400">LinkedIn</h1>
              </a>
              <a
                className=" cursor-pointer flex space-x-5"
                href="https://leetcode.com/manishaithani67"
                target="_blank"
                rel="noreferrer"
              >
                <SiLeetcode />
                <h1 className=" text-blue-400">LeetCode</h1>
              </a>
              <a
                className=" cursor-pointer flex space-x-5"
                href="https://github.com/FIREsingh/foodOrdering_FullStack"
                target="_blank"
                rel="noreferrer"
              >
                <FaFileCircleCheck />
                <h1 className=" text-blue-400">
                  <span>This Project</span>
                </h1>
              </a>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
