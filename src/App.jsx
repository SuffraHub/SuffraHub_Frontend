import { Routes, Route, HashRouter } from 'react-router-dom';

// Layouty
import LayoutLogin from './layouts/LayoutLogin.jsx';
import LayoutAdmin from './layouts/LayoutAdmin.jsx';
import LayoutPoll from './layouts/LayoutPoll.jsx';
import LayoutHome from './layouts/LayoutHome.jsx';

// Strona domowa
import Home from './pages/Home.jsx';

// Strony logowania
import Login from './pages/user/Login.jsx';
import Register from './pages/user/Register.jsx';
import RegisterToTenant from './pages/user/RegisterToTenant.jsx';

// Strony polls - z panelem bocznym z listą pytań
import PollPage from './pages/Poll.jsx';

// Dashboard
import AdminAccount from './pages/admin/Account.jsx';
import AdminHome from './pages/admin/Home.jsx';
import AdminPolls from './pages/admin/Polls.jsx';
import AdminQuestion from './pages/admin/Questions.jsx';
import AdminTenant from './pages/admin/Tenant.jsx';
import QuestionEdit from './pages/admin/QuestionEdit.jsx';
import AnswerOptions from './pages/admin/AnswerOptions.jsx';
import VoteCodes from './pages/admin/VoteCodes.jsx';
import PollEdit from './pages/admin/PollEdit.jsx'; 

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Publiczne layouty */}
        <Route element={<LayoutHome />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/user" element={<LayoutLogin />}>
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
          <Route path="/user/admin/register_to_tenant" element={<RegisterToTenant />} />
        </Route>

        {/* Layout 'głosowanie' */}
        <Route element={<LayoutPoll />}>
          <Route path="/poll" element={<PollPage />} />
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="/admin/polls" element={<AdminPolls />} />
          <Route path="/admin/polls/edit" element={<PollEdit />} /> 
          <Route path="/admin/questions" element={<AdminQuestion />} />
          <Route path="/admin/account" element={<AdminAccount />} />
          <Route path="/admin/tenant" element={<AdminTenant />} />
          <Route path="/admin/questions/edit" element={<QuestionEdit />} />
          <Route path="/admin/polls/vote_codes" element={<VoteCodes />} />
          <Route path="/admin/answer_options" element={<AnswerOptions />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
