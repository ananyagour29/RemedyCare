
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/QuickBlog-Assets/assets";
import Navbar from "../components/Navbar";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();

  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [Comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      if (data.success) {
        setData(data.blog);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", {
        blogId: id,
      });

      if (data.success) {
        setComments(data.comments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute top-10 left-0 w-full -z-10 opacity-50"
      />

      <Navbar />

      <div className="text-center mt-20 text-gray-600">
        <p className="text-gray-500 py-4 font-medium">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>

        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>

        <h2 className="my-5 max-w-lg truncate mx-auto">
          {data.subTitle}
        </h2>

        {new Date() - new Date(data.createdAt) <
          48 * 60 * 60 * 1000 && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              🆕 NEW
            </span>
          </div>
        )}

        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-cyan-800 font-medium text-gray-800">
          Ananya Gour
        </p>
      </div>

      <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
        {/* <img
          src={data.image}
          alt=""
          className="rounded-3xl mb-5"
        /> */}
<img
  src={data.image}
  alt=""
  className="rounded-3xl mb-5 w-full max-w-2xl mx-auto shadow-lg"
/>
        <div
          className="rich-text max-w-3xl mx-auto"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* Comments Section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto">
          <p className="font-semibold mb-4">
            Comments ({Comments.length})
          </p>

          <div className="flex flex-col gap-4">
            {Comments.map((item, index) => (
              <div
                key={index}
                className="relative border border-cyan-200 max-w-xl p-4 rounded text-gray-600 bg-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={assets.user_icon}
                    alt=""
                    className="w-6"
                  />
                  <p className="font-medium">{item.name}</p>
                </div>

                <p className="text-sm max-w-md ml-8">
                  {item.content}
                </p>

                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs text-gray-500">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment */}
        <div className="max-w-3xl mx-auto">
          <p className="font-semibold mb-4">
            Add your comment
          </p>

          <form
            onSubmit={addComment}
            className="flex flex-col items-start gap-4 max-w-lg"
          >
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />

            <textarea
              placeholder="Comment"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded outline-none h-48"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-cyan-700 text-white rounded p-2 px-8 hover:scale-105 transition-all cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <Loader />
  );
};

export default Blog;