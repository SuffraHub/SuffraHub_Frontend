import { Outlet } from "react-router-dom";
import Header from '../components/admin/Header.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';
import Footer from '../components/Footer.jsx';

const LayoutAdmin = () => {
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
            <Sidebar />

            <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LayoutAdmin;
