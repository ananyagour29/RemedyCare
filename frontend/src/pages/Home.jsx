
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { setUserToken, axios } = useAppContext();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/");
    }
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post("/api/user/logout", {
        email: localStorage.getItem("userEmail"),
      });

      localStorage.removeItem("userToken");
      localStorage.removeItem("userEmail");

      setUserToken(null);

      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />

      {/* 🔥 CLEAN HEADER ACTION AREA */}
      <div className="flex justify-end px-4 sm:px-20 mt-2">
        <button
          onClick={logoutUser}
          className="
            bg-cyan-600
            hover:bg-cyan-700
            text-white
            px-5 py-2
            rounded-full
            text-sm
            shadow-md
            transition-all
          "
        >
          Logout
        </button>
      </div>

      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;