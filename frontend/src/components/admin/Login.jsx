// import React,{useState} from 'react'
// import { useAppContext } from '../../context/AppContext';
// import {toast} from 'react-hot-toast';
// const Login=()=>{
//     const {axios,setToken}=useAppContext();
//     const[email,setEmail]=useState('')
//     const[password,setPassword]=useState('')
//     const handleSubmit=async(e)=>{
//       e.preventDefault()
//       try{
//         // const{data}=await axios.post('/api/admin/login',{email,password})
//         const {data} = await axios.post(
//   // 'http://localhost:3000/api/admin/login',
//   // Correct
// "https://note-it-nu-eight.vercel.app/api/admin/login",

//   { email, password }
// )
// // DELETE
// // const { data } = await axios.post(
// //   '/api/user/login',
// //   { email, password }
// // )
// // DELETE
//         if(data.success){
//             setToken(data.token);
//           localStorage.setItem('token',data.token);
//             axios.defaults.headers.common['Authorization']=data.token;
//             }else{
//                 toast.error(data.message)
//             }
//       }catch(error){
//         toast.error(error.message)
//       }
//     }
//     return (
//         <div className='flex items-center justify-center h-screen'>
//   <div className='w-full max-w-sm p-6 max-md:m-6 border border-cyan-600 shadow-xl shadow-cyan-700/80 rounded-lg'>
//   {/* 👉 Shadow ka bottom-heavy hona shadow-xl ki wajah se hai */}
//      <div className='flex flex-col items-center justify-center'>
//         <div className='w-full py-6 text-center'>
//             <h1 className='text-3xl font-bold'> <span className='text-cyan-700'>Admin</span> Login</h1>
//             <p className=' mt-3 font-light'>Enter Your credentials to access the admin panel</p>
//         </div>
//         <form onSubmit={handleSubmit} className='mt-6 w-full sm:wax-w-md text-gray-600'>
//             <div className='flex flex-col'>
//                 <label>Email</label>
//                 <input onChange={e=>setEmail(e.target.value)} value={email} type='email' required placeholder='your email id' className='border-b-2 border-gray-300 p-2 outline-none mb-5'/>
//                 {/* border-b-2 =bottom border 2 */}
//             </div>
//              <div className='flex flex-col'>
//                 <label>Password</label>
//                 <input onChange={e=>setPassword(e.target.value)} value={password}type='password' required placeholder='your password' className='border-b-2 border-gray-300 p-2 outline-none mb-5'/>
//              </div>
//              <button type='submit' className='w-full py-3 font-medium bg-cyan-700 text-white rounded cursor-pointer hover:bg-cyan-900'>Login</button>
//              {/* Width = parent ki poori width */}
//               {/* Padding top & bottom = medium space, button tall lagta hai   */}
//         </form>
//      </div>
//   </div>
//         </div>
//     )
// }
// export default Login;

import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { axios, setToken, navigate } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        '/api/admin/login',
        { email, password }
      );

      if (data.success) {
        setToken(data.token);

        localStorage.setItem('token', data.token);

        axios.defaults.headers.common['Authorization'] =
          `Bearer ${data.token}`;

        toast.success('Login successful');

        navigate('/admin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-cyan-600 shadow-xl shadow-cyan-700/80 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          
          <div className='w-full flex justify-start mb-2'>
            <button
              onClick={() => navigate('/')}
              className='text-sm text-cyan-700 hover:text-cyan-900 cursor-pointer'
            >
              ← Back
            </button>
          </div>

          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-cyan-700'>Admin</span> Login
            </h1>

            <p className='mt-3 font-light'>
              Enter your credentials to access the admin panel
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className='mt-6 w-full text-gray-600'
          >
            <div className='flex flex-col'>
              <label>Email</label>

              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter admin email'
                className='border-b-2 border-gray-300 p-2 outline-none mb-5'
              />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>

              <input
                type='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
                className='border-b-2 border-gray-300 p-2 outline-none mb-5'
              />
            </div>

            <button
              type='submit'
              className='w-full py-3 font-medium bg-cyan-700 text-white rounded cursor-pointer hover:bg-cyan-900'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
