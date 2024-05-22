import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const Navbar = () => {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="myContainer flex justify-between items-center px-4 py-5 h-24">
        <div className="logo font-bold text-white text-lg sm:text-2xl">
          <span className="text-green-700"> &lt; </span>
          Pass
          <span className="text-green-700">OP/&gt; </span>
        </div>
{/* 
        <ul>
          <li className="flex gap-4">
            <a className="hover:font-bold" href="http://">
              Home
            </a>
            <a className="hover:font-bold" href="http://">
              About
            </a>
            <a className="hover:font-bold" href="http://">
              Contact
            </a>
          </li>
        </ul> */}

        <a href="https://github.com" target="_blank">
          <GitHubIcon fontSize="large"/>
          <span className="font-bold px-2 text-lg sm:text-2xl">GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
