// import React from "react";
// import Navbar from "../components/Navbar"
// import Header from "../components/Header"
// import BlogList from "../components/BlogList"
// import Newsletter from "../components/Newsletter";
// import Footer from "../components/Footer";
// const Home=()=>{
//     return(
//         <>
//          <Navbar/>
//          <Header/>
//            <BlogList/>
//            <Newsletter/>
//            <Footer/>
//         </>
//     )
// }
// export default Home;
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Header from "../components/Header";
import BlogList from "../components/BlogList";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");

    if (!userToken) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;