import { useParams } from "react-router-dom";
import blogImg from "../assets/images/pexels.png";
import { blogsData } from "../assets/data/blogsData.js";
console.log(blogsData);

const BlogDetail = () => {
//   const { id } = useParams();

  // Dummy data (replace this with your actual data structure)
//   const dummyData = {
//     1: {
//       id: 1,
//       title: "Dummy Blog Title",
//       category: "Dummy Category",
//       summary: "This is a dummy blog summary.",
//       content:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//       author: "Dummy Author",
//       images: {blogImg}, // Replace with your actual image URL
//     },
//   };

 

  const { title, category, summary, content, author, images } = blogsData[0];
console.log('title',title);
  return (
    <div className="my-4 p-4 border rounded">
      <img
        src={images}
        alt=""
        className="mb-4 rounded-md max-h-60 object-cover w-full"
      />
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-2">Category: {category}</p>
      <p className="text-gray-600 mb-2">Category: {summary}</p>
      <p className="text-gray-800">{content}</p>
      <p className="text-gray-600 mb-2">Author: {author}</p>
    </div>
  );
};

export default BlogDetail;
