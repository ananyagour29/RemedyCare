// import { assets } from '../../assets/QuickBlog-Assets/assets'
// import React from "react"
// import { useAppContext } from '../../context/AppContext';
// import { toast } from 'react-hot-toast';
// const BlogTableItem=({blog,fetchBlogs,index})=>{
//     const {title,createdAt}=blog;
//     const BlogDate=new Date(createdAt)  
//     // const{axios}=useAppContext(); 
//     const { axios, fetchBlogs: fetchContextBlogs } = useAppContext();
//     const deleteBlog=async()=>{
//         const confirm=window.confirm("Are you sure you want to delete this blog?");
//         if(!confirm) return;
//         try{
//             const {data}=await axios.delete(`/api/blog/delete/${blog._id}`);
//             if(data.success){
//                 toast.success(data.message);
//                 await fetchBlogs();
//             }else{
//                 toast.error(data.message);
//             }
//         }catch(error){
//             toast.error(error.message);
//     }
// }
// const togglePublish=async()=>{
//     try{
//         const{data}=await axios.post('/api/blog/toggle-publish',{id:blog._id})
//         if(data.success){
//             toast.success(data.message);
//             await fetchBlogs();
//             await fetchContextBlogs(); 
//         }else{
//             toast.error(data.message);
//         }
//     }catch(error){
//         toast.error(error.message);
//     }
// }   
//     return(
//      <tr className="border-y border-gray-300">
//         <th className="px-2 py-4">{index}</th>
//         <td className="px-2 py-4">{title}</td>
//         <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
//         <td className="px-2 py-4 max-sm:hidden">
//             <p className={`${blog.isPublished?"text-green-600":"text-orange-700"}`}>
//                 {blog.isPublished?'published':'Unpublished'}
//             </p>
//         </td>
//         <td className="px-2 py-4 flex text-xs gap-3">
//               {/* {blog.isPublished && ( */}
//             <button  onClick={togglePublish}className='border px-2 py-0.5  mt-1 rounded cursor-pointer'>
//                 {blog.isPublished?'Unpublish':'Publish'}</button>
//                   {/* )} */}
//                 <img src={assets.cross_icon} className="w-8 hover:scale-110 transition-all cursor-pointer" alt="" onClick={deleteBlog}/>
//         </td>
//      </tr>
//     )
// }
// export default BlogTableItem
// // Ye component blog ki ek row table me dikhata hai.
// // Publish / Unpublish blog ka status batata aur change karta hai.
// // ❌ Cross icon blog ko delete karta hai.
import React from "react";
import { assets } from "../../assets/QuickBlog-Assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
const { title, createdAt } = blog;

const blogDate = new Date(createdAt);

const isNew =
Date.now() - new Date(createdAt).getTime() <
48 * 60 * 60 * 1000;

const { axios, fetchBlogs: fetchContextBlogs } = useAppContext();

const deleteBlog = async () => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this post?"
);


if (!confirmDelete) return;

try {
  const { data } = await axios.delete(
    `/api/blog/delete/${blog._id}`
  );

  if (data.success) {
    toast.success(data.message);
    await fetchBlogs();
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.message);
}


};

const togglePublish = async () => {
try {
const { data } = await axios.post(
"/api/blog/toggle-publish",
{
id: blog._id,
}
);


  if (data.success) {
    toast.success(data.message);
    await fetchBlogs();
    await fetchContextBlogs();
  } else {
    toast.error(data.message);
  }
} catch (error) {
  toast.error(error.message);
}

};

return ( <tr className="border-y border-gray-300"> <th className="px-2 py-4">{index}</th>

  <td className="px-2 py-4">
    <div className="flex items-center gap-2">
      <span>{title}</span>

      {isNew && (
        <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">
          NEW
        </span>
      )}
    </div>
  </td>

  <td className="px-2 py-4 max-sm:hidden">
    {blogDate.toDateString()}
  </td>

  <td className="px-2 py-4 max-sm:hidden">
    <p
      className={
        blog.isPublished
          ? "text-green-600"
          : "text-orange-700"
      }
    >
      {blog.isPublished
        ? "Published"
        : "Unpublished"}
    </p>
  </td>

  <td className="px-2 py-4 flex text-xs gap-3">
    <button
      onClick={togglePublish}
      className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
    >
      {blog.isPublished
        ? "Unpublish"
        : "Publish"}
    </button>

    <img
      src={assets.cross_icon}
      className="w-8 hover:scale-110 transition-all cursor-pointer"
      alt="delete"
      onClick={deleteBlog}
    />
  </td>
</tr>
)
};
export default BlogTableItem;
