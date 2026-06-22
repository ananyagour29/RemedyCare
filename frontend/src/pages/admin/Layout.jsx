
// // Light shadow = shadow-sm , Medium shadow = shadow-md ,Strong shadow = shadow-lg
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {
  const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    navigate('/');
  };

  return (
    <>
      <div className="flex items-center justify-between shadow-md p-4">

        <h1
          className="text-2xl sm:text-3xl font-bold cursor-pointer text-cyan-500"
          onClick={() => navigate('/')}
        >
          RemedyCare
        </h1>

        <div className="flex items-center gap-3">

          {/* <button
            onClick={() => navigate('/')}
            className="text-sm px-5 py-2 border border-cyan-600 text-cyan-600 rounded-full cursor-pointer hover:bg-cyan-50"
          >
            View Website
          </button> */}

          <button
            onClick={logout}
            className="text-sm px-8 py-2 bg-cyan-600 text-white rounded-full cursor-pointer"
          >
            Logout
          </button>

        </div>

      </div>

      <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;