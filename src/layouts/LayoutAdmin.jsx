// LAYOUT dla stron administracyjnych
import { Outlet, Link } from "react-router-dom";
import Header from '../components/admin/Header.jsx';
import Sidebar from '../components/admin/Sidebar.jsx';
import Footer from '../components/Footer.jsx';


const Layout = () => {
  return (
    <>
        <Header />
        <Sidebar />
            <Outlet />
        <Footer />
    </>
  )
};

export default Layout;
