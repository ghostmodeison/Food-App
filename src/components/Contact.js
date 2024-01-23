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
    <div className=" m-auto justify-center h-screen flex w-3/5 text-4xl text-slate-500  ">
      <div className=" h-auto m-auto ">
        <Section>
          <img className=" rounded-3xl" src={my} alt="MyImage" />
        </Section>
      </div>

      <div className=" h-auto m-auto space-y-5 flex flex-col">
        <Section>
          <div className=" h-auto m-auto space-y-5 flex flex-col">
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
              href="https://github.com/FIREsingh/FoodOrderingwebApplication"
              target="_blank"
              rel="noreferrer"
            >
              <FaFileCircleCheck />
              <h1 className=" text-blue-400">This Project</h1>
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}
