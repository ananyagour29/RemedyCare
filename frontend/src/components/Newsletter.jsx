import React from 'react';
const Newsletter=()=>{
    return(
        <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
            <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog !</h1>
            {/* md:text-4xl → On medium screens (≥768px) and larger, */}
            <p className="md:text-lg text-gray-800/70 pb-8">
  Read the latest thoughts, reflections, and experiences shared here.
</p>

            {/* <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                <input className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"type="text" placeholder="Enter your email id" required />
                // {/* <button type='submit' className="md:px-12 px-8 h-full text-white bg-cyan-700/80 hover:bg-cyan-800 transition-all cursor-pointer rounded-md rounded-1-none">Subscribe</button> */}
            {/* </form> */} 
        </div>
    )
}
export default Newsletter;