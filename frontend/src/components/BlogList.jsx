
// import React, { useState } from "react";
// import { blogCategories } from "../assets/QuickBlog-Assets/assets";
// import { motion } from "motion/react";
// import BlogCard from "./BlogCard";
// import { useAppContext } from "../context/AppContext";

// const BlogList = () => {
//   const [menu, setMenu] = useState("All");
//   const { blogs, input } = useAppContext();

//   // ✅ FIXED FILTER LOGIC (backend aligned)
//   const filteredBlogs = () => {
//     return blogs
//       .filter((blog) => blog.isPublished) // 🔥 IMPORTANT (backend match)
//       .filter((blog) =>
//         input === ""
//           ? true
//           : blog.title.toLowerCase().includes(input.toLowerCase()) ||
//             blog.category.toLowerCase().includes(input.toLowerCase())
//       )
//       .filter((blog) =>
//         menu === "All" ? true : blog.category === menu
//       );
//   };

//   return (
//     <div>
//       {/* CATEGORY MENU */}
//       <div className="flex justify-center gap-4 sm:gap-8 my-10 text-gray-700 relative">
//         {blogCategories.map((item) => (
//           <div key={item} className="relative">
//             <button
//               onClick={() => setMenu(item)}
//               className={`${menu === item && "text-white px-4 pt-0.5"}`}
//             >
//               {item}

//               {menu == item && (
//                 <motion.div
//                   layoutId="underline"
//                   transition={{
//                     type: "spring",
//                     stiffness: 500,
//                     damping: 30,
//                   }}
//                   className="absolute inset-0 bg-cyan-800 rounded-full -z-10"
//                 ></motion.div>
//               )}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* BLOG GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md-grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
//         {filteredBlogs().map((blog) => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogList;
import React, { useState } from "react";
import { blogCategories } from "../assets/QuickBlog-Assets/assets";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");

  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    return blogs
      .filter((blog) => blog.isPublished)
      .filter((blog) =>
        input === ""
          ? true
          : blog.title.toLowerCase().includes(input.toLowerCase()) ||
            blog.category.toLowerCase().includes(input.toLowerCase())
      )
      .filter((blog) =>
        menu === "All" ? true : blog.category === menu
      );
  };

  return (
    <div>
      {/* CATEGORY MENU */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 text-gray-700 relative">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`${menu === item && "text-white px-4 pt-0.5"}`}
            >
              {item}

              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                  className="absolute inset-0 bg-cyan-800 rounded-full -z-10"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* BLOG GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogList;