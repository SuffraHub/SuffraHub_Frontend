import { Outlet } from "react-router-dom";
import SidebarPoll from '../components/poll/SidebarPoll.jsx';
import Footer from '../components/Footer.jsx';
import HeaderHome from '../components/home/HeaderHome.jsx';
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const LayoutPoll = () => {
  const location = useLocation();
  const pollData = location.state;

  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <>
      <HeaderHome />
      <div className="container-fluid">
        <div className="row">
          <SidebarPoll
            data={pollData}
            selectedQuestion={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
          />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex">
            <Outlet context={{ pollData, selectedQuestion }} />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutPoll;
