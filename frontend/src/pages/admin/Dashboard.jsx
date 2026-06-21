// import React,{useState,useEffect} from 'react'
// import { assets ,dashboard_data} from '../../assets/QuickBlog-Assets/assets';
// import BlogTableItem from '../../components/admin/BlogTableItem';
// import { useAppContext } from '../../context/AppContext';
// import { toast } from 'react-hot-toast';
// const Dashboard=()=>{
//     const[dashboardData,setDashboardData]=useState({
//         blogs:0,
//         comments:0,
//         drafts:0,
//         recentBlogs:[],
//     })
//     const {axios}=useAppContext();
//     const fetchDashboard=async()=>{
//      try{
//         const {data}=await axios.get('/api/admin/dashboard')
//         if(data.success){
//             setDashboardData(data.dashboardData)
//         }else{
//             toast.error(data.message)
//         }
//         }catch(error){
//             toast.error(error.message)
//         }     
//      }
//     useEffect(()=>{
//         fetchDashboard()
//     },[])
//     return(
//        <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
//   <div className='grid grid-cols-3 gap-3'>
//     {/* 1 */}
//     {/* <div className='bg-white p-2 rounded shadow text-center'>
//       <img src={assets.dashboard_icon_1} alt='' className='mx-auto mb-1'/>
//       <p className='text-lg font-semibold text-gray-600'>{dashboardData.blogs}</p>
//       <p className='text-gray-400 text-sm'>Blogs</p>
//     </div> */}
// <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
//   <p className='text-lg font-semibold text-gray-600 mt-4'>{dashboardData.blogs}</p>
//   <p className='text-gray-400 text-sm'>Blogs</p>
// </div>
// {/* 2 */}
//     {/* <div className='bg-white p-2 rounded shadow text-center'>
//       <img src={assets.dashboard_icon_2} alt='' className='mx-auto mb-1'/>
//       <p className='text-lg font-semibold text-gray-600'>{dashboardData.comments}</p>
//       <p className='text-gray-400 text-sm'>Comments</p>
//     </div> */}
//     <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
//   <p className='text-lg font-semibold text-gray-600 mt-4'>{dashboardData.comments}</p>
//   <p className='text-gray-400 text-sm'>Comments</p>
// </div>

// {/* 3 */}
//     {/* <div className='bg-white p-2 rounded shadow text-center'>
//       <img src={assets.dashboard_icon_3} alt='' className='mx-auto mb-1'/>
//       <p className='text-lg font-semibold text-gray-600'>{dashboardData.drafts}</p>
//       <p className='text-gray-400 text-sm'>Drafts</p>
//     </div> */}
//     <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
//   <p className='text-lg font-semibold text-gray-600 mt-4'>{dashboardData.drafts}</p>
//   <p className='text-gray-400 text-sm'>Drafts</p>
// </div>

//   </div>
//   {/* another div */}
//   <div>
//     <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
//       {/* <img src={assets.dashboard_icon_4} alt=""/> */}
//       <p> Latest Blogs</p>
//     </div>
//     <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
//       <table className="w-full text-sm text-gray-500">
//         {/* heading of each column */}
//         <thead className="text-xs text-gray-600 text-left uppercase">
//           <tr>
//             <th scope='col' className="px-2 py-4 xl:px-6">#</th>
//             <th scope='col' className="px-2 py-4">Blog Title</th>
//             <th scope='col' className="px-2 py-4 max-sm:hidden">Date</th>
//             <th scope='col' className="px-2 py-4 max-sm:hidden">Status</th>
//            <th scope='col' className="px-2 py-4">Actions</th>
//           </tr>
//         </thead>
//         {/* content data of each column */}
//             <tbody>
//               {dashboardData.recentBlogs.map((blog,index)=>{
//                 return <BlogTableItem key={blog._id} blog={blog}
//                 fetchBlogs={fetchDashboard} index={index+1}/>
//                 // 2️⃣ For every blog, a BlogTableItem row component is created.
// // 3️⃣ Blog data, row number (index + 1), and function reference are passed as props.
//               })}
//             </tbody>
//       </table>
//     </div>
//   </div>
// </div>
//     )
// }
// export default Dashboard;
import React, { useState, useEffect } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard');

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

      {/* Stats Cards */}
      <div className='grid grid-cols-3 gap-3'>

        <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
          <p className='text-lg font-semibold text-gray-600 mt-2'>
            {dashboardData.blogs}
          </p>
          <p className='text-gray-400 text-sm'>Posts</p>
        </div>

        <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
          <p className='text-lg font-semibold text-gray-600 mt-2'>
            {dashboardData.comments}
          </p>
          <p className='text-gray-400 text-sm'>Comments</p>
        </div>

        <div className='bg-white p-4 rounded shadow text-center flex flex-col justify-center items-center h-24'>
          <p className='text-lg font-semibold text-gray-600 mt-2'>
            {dashboardData.drafts}
          </p>
          <p className='text-gray-400 text-sm'>Drafts</p>
        </div>

      </div>

      {/* Latest Posts */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <p>Latest Posts</p>
        </div>

        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">

          <table className="w-full text-sm text-gray-500">

            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope='col' className="px-2 py-4 xl:px-6">#</th>
                <th scope='col' className="px-2 py-4">Post Title</th>
                <th scope='col' className="px-2 py-4 max-sm:hidden">Date</th>
                <th scope='col' className="px-2 py-4 max-sm:hidden">Status</th>
                <th scope='col' className="px-2 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.length > 0 ? (
                dashboardData.recentBlogs.map((blog, index) => (
                  <BlogTableItem
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchDashboard}
                    index={index + 1}
                  />
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No posts available
                  </td>
                </tr>
              )}
            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;