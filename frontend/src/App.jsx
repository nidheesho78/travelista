
import './app.css';
import { useLocation } from 'react-router-dom';

import Layout from './layout/Layout';
import AdminLayout from './layout/adminLayout';

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  

  return (
  <>
  {isAdminPage ? <AdminLayout /> : <Layout />}
     
  </>
 
  )
}

export default App
