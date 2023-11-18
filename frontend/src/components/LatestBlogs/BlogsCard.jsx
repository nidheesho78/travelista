import React from "react";

import { useNavigate } from "react-router-dom";

const BlogsCard = ({ blogs }) => {

  const navigate = useNavigate();
  const { title, category, summary, content, author, images } = blogs;
  return (
    <div className="hover:shadow-md p-6 mb-6 bg-slate-100 rounded-md  lg:p-5 cursor-pointer " onClick={() => navigate('/users/blogdetail')}>
      <div>
        <img src={images} className="w-full" alt="" />
      </div>
      <h1
        className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor 
font-[700]mt-3 lg:mt-5"
      >
        {title}
      </h1>

      <div className="flex items-center justify-between">
        <span
          className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-6 text-[12px] leading-4 lg:text-[16px]
   first-letter:lg:leading-7 font-semibold rounded"
        >
          {category}
        </span>
      </div>

      <h2
        className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor 
font-[700]mt-3 lg:mt-5"
      >
        {summary}
      </h2>

      <p
        className="text-[16px] leading-[26px] lg:text-[18px] lg:leading-9 text-headingColor 
font-[400]mt-3 lg:mt-5"
      >
        {content}
      </p>

      <h3
        className="text-[18px] leading-[30px] lg:text-[18px] lg:leading-9 text-headingColor 
font-semibold"
      >
        {author}
      </h3>
    </div>
  );
};

export default BlogsCard;
