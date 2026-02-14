import React,{useEffect, useState} from 'react'
import { comments_data } from '../../assets/QuickBlog-Assets/assets';
// import CommentTableItem from '../../components/admin/CommentTableItem';
import CommentTableItem from "../../components/admin/CommentTableItem";
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-hot-toast';
const Comments=()=>{
    const [comments,setComments]=useState([]);
    // useState data ko rakhta aur badalta hai,
// useEffect batata hai data kab laana hai.
    const[filter,setFilter]=useState("Not Approved")
    const{axios}=useAppContext();
    const fetchComments=async()=>{
        try{
            const {data}=await axios.get('/api/admin/comments')
            if(data.success){
                setComments(data.comments)
            }else{
                toast.error(data.message)
            }               
        } catch(error){   
        toast.error(error.message)
    }
  }

    useEffect(()=>{
        fetchComments()
    },[])
    // useEffect ek baar chalta hai, lekin usme poora data load hota hai — ek-ek comment nahi.
    return(
<div className="flex-1 bg-blue-50/50 px-4 py-5 sm:px-6 sm:py-10">
  
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between max-w-4xl mx-auto">
    
    <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center sm:text-left">
      Comments
    </h1>

    <div className="flex justify-center sm:justify-end gap-3">
      <button
        onClick={() => setFilter('Approved')}
        className={`border rounded-full px-4 py-1 text-xs sm:text-sm transition
        ${filter === 'Approved'
          ? 'text-cyan-600 border-cyan-600 bg-cyan-50'
          : 'text-gray-600 border-gray-300'}`}
      >
        Approved
      </button>
{/* Purpose: You want to filter comments based on their status: "Approved" or "Not Approved" */}
      <button
        onClick={() => setFilter('Not Approved')}
        className={`border rounded-full px-4 py-1 text-xs sm:text-sm transition
        ${filter === 'Not Approved'
          ? 'text-cyan-600 border-cyan-600 bg-cyan-50'
          : 'text-gray-600 border-gray-300'}`}
      >
        Not Approved
      </button>
    </div>
  </div>
  <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
  <table className='w-full text-sm text-gray-500'>
    <thead className='text-xs text-gray-700 text-left uppercase'>
      <tr>
        <th scope='col' className="px-6 py-3">Blog Title & Comment</th>
        <th scope='col' className="px-6 py-3 max-sm:hidden">Date</th>
        <th scope='col' className="px-6 py-3">Action</th>
      </tr>
    </thead>
    {/* <tbody>
      {comments.filter((comment)=>{
        if(filter=="Approved")return comments.isApproved===true;
        return comment.isApproved===false;  
      }).map((comment,index)=><CommentTableItem key={comment._id} comment={comment}  index={index+1} fetchComments={fetchComments}/>)}
    </tbody> */}
    <tbody>
  {comments
    .filter(comment =>
      filter === "Approved"
        ? comment.isApproved === true
        : comment.isApproved === false
    )
    .map((comment, index) => (
      <CommentTableItem
        key={comment._id}
        comment={comment}
        fetchComments={fetchComments}
      />
    ))}
</tbody>

  </table>
  </div>
</div>

    )
}
export default Comments;