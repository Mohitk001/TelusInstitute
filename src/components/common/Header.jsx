import React, { useState } from "react";
import LogoImg from "../assets/images/logo-black.png"; // Update the path to your logo
import { LinkData } from "../assets/data/data";
import { NavLink, Link } from "react-router-dom";
import { IoPersonSharp, IoMenu, IoClose } from "react-icons/io5";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white py-3 text-black sticky z-50 shadow-md top-0 left-0 w-full">
      <div className="container mx-auto px-4 sm:px-5 md:px-6 lg:px-7 xl:px-8 2xl:px-10 flex justify-between items-center">
        <div className="logo flex items-center gap-2 ml-1">
          <img src={LogoImg} alt="logo" className="h-8 md:h-10 lg:h-12 xl:h-12" />
          <p className="m-1 font-extrabold text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] 2xl:text-[30px] tracking-wide">
            <span style={{ color: "red", fontSize: "28px", fontWeight: "bold" }}>T</span>
            elus
            <span style={{ color: "red", fontSize: "28px", fontWeight: "bold" }}>I</span>
            nstitute
          </p>
        </div>

        <nav className="hidden lg:flex items-center gap-4 text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl ml-auto pr-4">
          <ul className="flex gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {LinkData.map((link) => (
              <li key={link.id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-semibold border-2 border-white px-3 py-1 rounded-md"
                      : "text-sm md:text-base lg:text-lg hover:text-primary transition duration-300 px-2 py-1 rounded-md"
                  }
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-6 mr-3">
          <button>
            <IoPersonSharp size={22} className="hover:text-primary transition duration-300" />
          </button>
          <Link to="/login">
            <button className="text-md hover:text-primary transition duration-300">Login</button>
          </Link>
        </div>

        <div className="flex items-center lg:hidden mr-3">
          <button onClick={toggleNav}>
            {navOpen ? (
              <IoClose size={22} className="hover:text-primary transition duration-300" />
            ) : (
              <IoMenu size={22} className="hover:text-primary transition duration-300" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden bg-white w-full shadow-md fixed top-16 left-0 h-full transform ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col items-center gap-4 py-4">
          {LinkData.map((link) => (
            <li key={link.id}>
              <NavLink
                onClick={() => setNavOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 font-semibold border-2 border-white px-3 py-1 rounded-md"
                    : "text-base hover:text-primary transition duration-300 px-3 py-1 rounded-md"
                }
                to={link.url}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
          <li className="flex flex-col items-center gap-2">
            <button>
              <IoPersonSharp size={22} className="hover:text-primary transition duration-300" />
            </button>
            <Link to="/login" onClick={() => setNavOpen(false)}>
              <button className="text-md hover:text-primary transition duration-300">Login</button>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};