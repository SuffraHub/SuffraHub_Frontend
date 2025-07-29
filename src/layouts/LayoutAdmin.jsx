// LAYOUT dla stron administracyjnych
import { Outlet, Link } from "react-router-dom";
import Header from '../components/admin/Header.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';
import Footer from '../components/Footer.jsx';


const Layout = () => {
  return (
    <>
        <Header />
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <Outlet />
          </main>
        </div>
        <Footer />
    </>
  )
};

export default Layout;
