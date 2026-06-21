import React, { useRef } from "react";
import { assets } from "../assets/QuickBlog-Assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-20 mb-8">
        <div className="inline-flex items-center justify-center px-7 py-2 border border-cyan-500/40 bg-cyan-100 rounded-full text-sm text-cyan-500">
          <p>Natural remedies, wellness & healthy living</p>
        </div>

        <h1 className="text-3xl mt-10 sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Discover <span className="text-cyan-600/80">Natural Remedies</span>,
          <br />
          Wellness & Healthy Living
        </h1>

        <p className="my-6 sm:my-8 max-w-3xl m-auto text-xl sm:text-lg text-gray-700/80">
          Explore natural remedies, skin and hair care tips, immunity support,
          and healthy recipes. Find simple wellness solutions for everyday life.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-700 bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search remedies, wellness tips, recipes..."
            required
            className="w-full pl-4 outline-none"
          />

          <button
            type="submit"
            className="bg-cyan-700/70 text-white px-6 py-2 m-0.5 rounded hover:scale-105 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center">
        {input && (
          <button
            onClick={onClear}
            className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-40 -z-10 opacity-50 w-full"
      />
    </div>
  );
};

export default Header;