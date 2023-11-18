
import AdminHeader from '../components/adminComponents/adminHeader.jsx'; 
import AdminFooter from '../components/adminComponents/adminFooter.jsx';
import AdminRouters from '../routes/AdminRouters.jsx';


function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <main>
        <AdminRouters />
      </main>
      <AdminFooter />
    </>
  );
}

export default AdminLayout





