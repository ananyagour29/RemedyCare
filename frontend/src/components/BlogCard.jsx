
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
const {
title,
description,
category,
image,
_id,
isNew,
} = blog;

const navigate = useNavigate();

return (
<div
onClick={() => navigate(`/blog/${_id}`)}
className="w-full rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:shadow-gray-800/40 transition-transform duration-300 cursor-pointer bg-white"
> <img
     src={image}
     alt=""
     className="aspect-video w-full object-cover"
   />


  <div className="ml-5 mt-4 flex items-center gap-2">
    <span className="px-3 py-1 inline-block bg-cyan-700/20 rounded-full text-gray-800 text-xs">
      {category}
    </span>

    {isNew && (
      <span className="px-2 py-1 bg-red-500 text-white text-[10px] rounded-full">
        🆕 NEW
      </span>
    )}
  </div>

  <div className="p-5">
    {/* <h5 className="mb-2 font-medium text-gray-900">
      {title}
    </h5> */}
<h5 className="mb-2 font-medium text-gray-900">
  {title}
</h5>

    <p
      className="mb-3 text-xs text-gray-600"
      dangerouslySetInnerHTML={{
        __html: description.slice(0, 80),
      }}
    ></p>


  </div>
</div>


);
};

export default BlogCard;
