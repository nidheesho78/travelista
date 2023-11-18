import AddCategory from "../pages/AdminPages/AddCategory";
import AdminLogin from "../pages/AdminPages/AdminLogin.jsx";
import Category from "../pages/AdminPages/Category.jsx";
import Dashboard from "../pages/AdminPages/Dashboard.jsx";
import EditCategory from "../pages/AdminPages/EditCategory.jsx";
import AdminUsers from "../pages/AdminPages/UsersTable.jsx";
import {Routes,Route} from 'react-router-dom';



function AdminRouters () {

return (
  <Routes>
    <Route path="/admin" element={<AdminLogin />} />

    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/get-users" element={<AdminUsers />} />
    <Route path="/admin/add-category" element={<AddCategory />} />
    <Route path="/admin/dashboard" element={<Dashboard />} />
    <Route path="/admin/edit-category" element={<EditCategory />} />
    <Route path="/admin/category" element={<Category />} />
  </Routes>
);

}
export default AdminRouters

