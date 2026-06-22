
import React from "react";
import { assets } from "../assets/QuickBlog-Assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex items-center justify-between py-4 px-4 sm:px-20">

      {/* Logo */}
      <h1
        onClick={() => navigate("/home")}
        className="text-2xl sm:text-4xl font-semibold tracking-wider text-cyan-500 cursor-pointer"
      >
        RemedyCare
      </h1>

      {/* Right Button */}
      <button
        onClick={() => navigate("/admin")}
        className="
          flex items-center gap-2
          bg-cyan-600 text-white
          px-4 py-2 sm:px-6 sm:py-2.5
          rounded-full text-xs sm:text-sm
          whitespace-nowrap
        "
      >
        {token ? "Dashboard" : "Admin Login"}

        <img src={assets.arrow} className="w-3 sm:w-3" alt="" />
      </button>

    </div>
  );
};

export default Navbar;