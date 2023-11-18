import React from 'react';
import {blogsData} from '../../assets/data/blogsData';
import BlogsCard from '../LatestBlogs/BlogsCard';



const LatestBlogs = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] 
    mt-[30px] lg:mt-[55px]'>{blogsData.map((blogs) => <BlogsCard key={blogs.id} blogs={blogs}/> )}</div>
  )
}

export default LatestBlogs