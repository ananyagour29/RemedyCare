// // DELETE
// import React,{useState} from 'react'
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const Register = () => {

//   const {axios,setToken,navigate} = useAppContext();
//   const [name,setName] = useState('')
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')

//   const handleSubmit = async(e)=>{
//     e.preventDefault()

//     try{
//       const {data} = await axios.post('/api/user/register',{
//         name,email,password
//       })

//       if(data.success){
//         setToken(data.token)
//         localStorage.setItem('token',data.token)
//         axios.defaults.headers.common['Authorization']=data.token
//         navigate('/')
//       }else{
//         toast.error(data.message)
//       }

//     }catch(error){
//       toast.error(error.message)
//     }
//   }

//   return(
//     <div className='flex items-center justify-center h-screen'>
//       <div className='w-full max-w-sm p-6 border border-cyan-600 rounded-lg'>
//         <h1 className='text-3xl font-bold text-center mb-5'>
//           <span className='text-cyan-700'>User</span> Register
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <input
//             type='text'
//             placeholder='Name'
//             required
//             className='border-b-2 p-2 w-full mb-4'
//             onChange={(e)=>setName(e.target.value)}
//           />

//           <input
//             type='email'
//             placeholder='Email'
//             required
//             className='border-b-2 p-2 w-full mb-4'
//             onChange={(e)=>setEmail(e.target.value)}
//           />

//           <input
//             type='password'
//             placeholder='Password'
//             required
//             className='border-b-2 p-2 w-full mb-4'
//             onChange={(e)=>setPassword(e.target.value)}
//           />

//           <button className='w-full py-2 bg-cyan-600 text-white rounded'>
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register
