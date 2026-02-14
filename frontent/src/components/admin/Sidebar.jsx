import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/QuickBlog-Assets/assets';

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
      <NavLink
        end
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
           ${isActive ? "bg-cyan-500/10 border-r-4 border-cyan-600" : ""}`
        }
      >
        <img src={assets.home_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">DashBoard</p>
      </NavLink>
         <NavLink
        end
        to="/admin/addBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
           ${isActive ? "bg-cyan-500/10 border-r-4 border-cyan-600" : ""}`
        }
      >
        <img src={assets.add_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blogs</p>
      </NavLink>
      <NavLink
        end
        to="/admin/ListBlog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
           ${isActive ? "bg-cyan-500/10 border-r-4 border-cyan-600" : ""}`
        }
      >
        <img src={assets.list_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Blog List</p>
      </NavLink>
          <NavLink
        end
        to="/admin/comments"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer
           ${isActive ? "bg-cyan-500/10 border-r-4 border-cyan-600" : ""}`
        }
      >
        <img src={assets.comment_icon} alt="" className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Comments</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
// this file represent the sidebar 4 option that are visible to the blog writer