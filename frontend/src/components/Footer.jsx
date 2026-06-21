import React from "react";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-cyan-900 text-gray-200">
      
      <div className="flex flex-col items-center py-6 text-center gap-2">
        <p className="text-sm md:text-base">
          Discover natural remedies, wellness tips, healthy recipes, and personal care guidance for everyday health.
        </p>

        <p className="text-sm md:text-base">
          Simple, easy-to-understand information on skin care, hair care, immunity, and natural wellness.
        </p>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-white">
        © {new Date().getFullYear()} RemedyCare. Your guide to natural wellness.
      </p>
      
    </div>
  );
};

export default Footer;