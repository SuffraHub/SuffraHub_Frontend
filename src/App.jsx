import { Routes, Route, HashRouter } from 'react-router-dom';

// Layouty
import LayoutDefault from './layouts/LayoutDefault.jsx';
import LayoutAdmin from './layouts/LayoutAdmin.jsx';

// Strony z layoutem zwykłym
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RegisterToTenant from './pages/RegisterToTenant.jsx';

// Dashboard
import AdminHome from './pages/AdminHome.jsx';
import AdminPolls from './pages/AdminPolls.jsx';
import AdminQuestion from './pages/AdminQuestions.jsx';
import AdminAccount from './pages/AdminAccount.jsx';
import AdminTenant from './pages/AdminTenant.jsx';
import QuestionEdit from './pages/QuestionEdit.jsx';
import VoteCodes from './pages/VoteCodes.jsx';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Publiczne layouty */}
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/admin/register_to_tenant" element={<RegisterToTenant />} />
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/polls" element={<AdminPolls />} />
          <Route path="/admin/questions" element={<AdminQuestion/>}/>
          <Route path="/admin/account" element={<AdminAccount/>}/>
          <Route path="/admin/tenant" element={<AdminTenant />}/>
          <Route path="/admin/questions/edit" element={<QuestionEdit />}/>
          <Route path="/admin/polls/vote_codes" element={<VoteCodes />}/>
        </Route>

      </Routes>
    </HashRouter>
  );
};

export default App;
