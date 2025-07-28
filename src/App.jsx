import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AdminHome from './pages/AdminHome.jsx';

const App = () => {
  return (
    <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminHome />} />
    </Routes>
    </HashRouter>
  );
};

export default App;

