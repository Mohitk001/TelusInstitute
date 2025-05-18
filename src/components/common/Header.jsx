import React, { useState } from "react";
import LogoImg from "../assets/images/logo-black.png";
import { LinkData } from "../assets/data/data";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <header className="bg-white py-3 text-black sticky z-50 shadow-md top-0 left-0 w-full">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo Section - Made more compact on mobile */}
        <div className="logo flex items-center gap-1 md:gap-2">
          <img 
            src={LogoImg} 
            alt="logo" 
            className="h-8 md:h-10 lg:h-12 xl:h-12" 
          />
          <p className="font-extrabold text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-2xl tracking-wide whitespace-nowrap">
            <span className="text-red-600 text-xl md:text-2xl lg:text-3xl font-bold">T</span>
            elus
            <span className="text-red-600 text-xl md:text-2xl lg:text-3xl font-bold">I</span>
            nstitute
          </p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 text-lg xl:text-xl ml-auto">
          <ul className="flex gap-4 lg:gap-5 xl:gap-6">
            {LinkData.map((link) => (
              <li key={link.id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 font-semibold border-2 border-white px-3 py-1 rounded-md"
                      : "text-base hover:text-primary transition duration-300 px-2 py-1 rounded-md"
                  }
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden ml-4">
          <button 
            onClick={toggleNav}
            className="focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {navOpen ? (
              <IoClose size={24} className="hover:text-primary transition duration-300" />
            ) : (
              <IoMenu size={24} className="hover:text-primary transition duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden bg-white w-full shadow-md fixed top-16 left-0 h-full transform ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
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
        </ul>
      </div>
    </header>
  );
};