import React from "react";
import { assets } from "../assets/QuickBlog-Assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
const { navigate, token } = useAppContext();

return ( <div className="flex justify-between items-center py-5 px-4 sm:px-20">
<h1
onClick={() => navigate("/")}
className="text-4xl font-semibold tracking-wider text-cyan-500 cursor-pointer"
>
RemedyCare </h1>


  <button
    onClick={() => navigate("/admin")}
    className="flex items-center gap-2 cursor-pointer rounded-full text-sm bg-cyan-600 text-white px-6 py-2.5 sm:px-10"
  >
    {token ? "Dashboard" : "Admin Login"}

    <img
      src={assets.arrow}
      className="w-3"
      alt="arrow"
    />
  </button>
</div>


);
};

export default Navbar;
