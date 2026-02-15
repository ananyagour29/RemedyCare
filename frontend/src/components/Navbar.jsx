import React from "react";
import {assets} from '../assets/QuickBlog-Assets/assets'
// import{useNavigate} from "react-router-dom";
import {useAppContext} from '../context/AppContext';
const Navbar =()=>{
    // const navigate=useNavigate();
    const {navigate,token}=useAppContext();
    return(
//         <div className=' flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer'>
//           {/* <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-24 sm:w-44'/>
//            */}
//              <h1
//   onClick={() => navigate('/')}
//   className="text-4xl font-semibold tracking-wider text-cyan-500 cursor-pointer relative right-20"
// >
//   NOTE.IT
// </h1>

//           <button onClick={()=>navigate('/admin')} className='flex  items-center gap-2 cursor-pointer rounded-full text-sm bg-cyan-600 text-white px-10 py-2.5'>{token?'Dashbaord':'Login'}
//             {/* here is the logic that when login is pressed it will navigate to admin */}
//             <img src={assets.arrow} className='w-3' alt="arrow"/>
//           </button>
//         </div>
<div className='flex justify-between items-center py-5 px-4 sm:px-20'>
  <h1
    onClick={() => navigate('/')}
    className="text-4xl font-semibold tracking-wider text-cyan-500 cursor-pointer"
  >
    NOTE.IT
  </h1>
  <button
    onClick={()=>navigate('/admin')}
    className='flex items-center gap-2 cursor-pointer rounded-full text-sm bg-cyan-600 text-white px-6 py-2.5 sm:px-10'
  >
    {token ? 'Dashboard' : 'Login'}
    <img src={assets.arrow} className='w-3' alt="arrow"/>
  </button>
</div>

    )
}
export default Navbar;