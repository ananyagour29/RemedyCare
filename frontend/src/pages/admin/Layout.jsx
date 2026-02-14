import React from 'react'
import { assets } from '../../assets/QuickBlog-Assets/assets';
import {Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';
const Layout=()=>{
    // const navigate=useNavigate()
    const{axios,setToken,navigate}=useAppContext();
    const logout=()=>{
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization']=null;
        setToken(null);
        navigate('/')
    }
    return(
    <>
    <div className="flex items-center justify-between shadow-md p-4">
         {/* when use click on logo it reset them to homepage */}
         <h1
          className="text-2xl sm:text-3xl font-bold cursor-pointer text-cyan-500"
          onClick={() => navigate('/')}
        >
          NOTE.IT
        </h1>
        <button onClick={logout} className='text-sm px-8 py-2 bg-cyan-600 text-white rounded-full cursor-pointer'>Logout</button>
    </div>
    <div className='flex h-[calc(100vh-70px)]'>
        <Sidebar/>
        <Outlet/>
        {/* Outlet ek jagah (placeholder) hota hai jahan child route ka component show hota hai. */}
    </div>
    </>
    )
}
export default Layout;
// Light shadow = shadow-sm , Medium shadow = shadow-md ,Strong shadow = shadow-lg