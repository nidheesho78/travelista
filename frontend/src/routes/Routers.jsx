import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import CreateBlog from '../pages/CreateBlog';
import Blogs from '../pages/Blogs';
import BlogDetail from "../pages/BlogDetail";

import {Routes,Route} from 'react-router-dom';

function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/users/create-blogs" element={<CreateBlog />} />
      <Route path="/users/Blogs" element={<Blogs />} />
      <Route path="/users/blogdetail" element={<BlogDetail />} />
    </Routes>
  );
}

export default Routers