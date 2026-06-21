// import React from "react"
// const Footer=()=>{
//     return(
// //         <div className=" px-6 md:px-16 lg:px-24 xl:px-32 bg-cyan-900">
// //             <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
// //                <div>
// //                 <p></p>
// //                </div>
// //             </div>
// //             <p className="py-4 text-center text-sm md:text-base text-white">Copyright 2025 @ FeelFree .All Right Reserved</p>
// //         </div>
// //     )
// // }
// // export default Footer;
// <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-cyan-900 text-gray-200">
//   <div className="flex flex-col items-center py-6 text-center gap-2">
//     <p className="text-sm md:text-base">
//   Sharing knowledge, experiences, and discoveries across life lessons, culture, language, and food science.
// </p>

//    <p className="text-sm md:text-base">
//   Just reading, learning, and enjoying — no logins, no clutter.
// </p>

//   </div>

//   <p className="py-4 text-center text-sm md:text-base text-white">
//     © 2025 NOTE.IT. Crafted for curious minds.
//   </p>
// </div>
//     )
// }
// export default Footer;
import React from "react";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-cyan-900 text-gray-200">
      
      <div className="flex flex-col items-center py-6 text-center gap-2">
        <p className="text-sm md:text-base">
          Sharing knowledge, experiences, and discoveries across life lessons, culture, language, and food science.
        </p>

        <p className="text-sm md:text-base">
          Just reading, learning, and enjoying — no logins, no clutter.
        </p>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-white">
        © {new Date().getFullYear()} NOTE.IT. Crafted for curious minds.
      </p>
      
    </div>
  );
};

export default Footer;