import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
  const [activePolls, setActivePolls] = useState([]);
  const [closedPolls, setClosedPolls] = useState([]);
  const [inactivePolls, setInactivePolls] = useState([]);

  const [isActiveOpen, setIsActiveOpen] = useState(true);
  const [isClosedOpen, setIsClosedOpen] = useState(false);
  const [isInactiveOpen, setIsInactiveOpen] = useState(false);

  const [tenantName, setTenantName] = useState('...');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const userRes = await axios.get('http://localhost:8000/user-info', { withCredentials: true });
        const companyId = userRes.data.company_id;
        //console.log("Company:", companyId);

        const tenantRes = await axios.get(`http://localhost:8001/tenant-info/${companyId}`, { withCredentials: true });
        //console.log(tenantRes.data.companyInfo.name);
        setTenantName(tenantRes.data.companyInfo.name || 'Unknown');

        const pollRes = await axios.get(`http://localhost:8005/poll-by-company/${companyId}`);
        const polls = pollRes.data.pollData || [];

        const now = new Date();

        const active = [];
        const closed = [];
        const inactive = [];

        polls.forEach(poll => {
          const validTo = new Date(poll.valid_to);
          if (!poll.is_active) {
            inactive.push(poll);
          } else if (validTo < now) {
            closed.push(poll);
          } else {
            active.push(poll);
          }
        });

        setActivePolls(active);
        setClosedPolls(closed);
        setInactivePolls(inactive);
      } catch (err) {
        console.error('Error fetching polls or user info:', err);
      }
    };

    fetchPolls();
  }, []);

  const renderPollList = (polls) => (
    <ul className="ms-2">
      {polls.length > 0 ? (
        polls.map(poll => (
          <li key={poll.id}>
            <Link
              to={`/poll/${poll.id}`}
              className="btn btn-link p-0 text-start"
              style={{ textDecoration: 'none' }}
            >
              {poll.name}
            </Link>
          </li>
        ))
      ) : (
        <li className="text-secondary">none</li>
      )}
    </ul>
  );

  const handleLogout = () => {
    axios.post('http://localhost:8000/logout', null, { withCredentials: true })
      .then(() => {
        navigate('/');
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
  };

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white" id="sidebarMenuLabel">
            Tenant:<br /> <b>{tenantName}</b>
          </h5>
          <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          {/* Nawigacja */}
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 active" to="/">
                <i className="bi bi-house-fill text-black"></i>
                Homepage
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin">
                <i className="bi bi-house-gear-fill text-black"></i>
                Admin panel
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin/questions">
                <i className="bi bi-database text-black"></i>
                Questions
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin/answer_options">
                <i className="bi bi-alt text-black"></i>
                Answer variants
              </Link>
            </li> */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin/tenant">
                <i className="bi bi-people text-black"></i>
                Tenant
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin/reports">
                <i className="bi bi-graph-up text-black"></i>
                Reports
              </Link>
            </li>
          </ul>

          {/* Głosowania */}
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>My polls</span>
            <Link className="link-secondary" to="/admin/polls" aria-label="Add a new poll">
              <i className="bi bi-plus-circle text-black"></i>
            </Link>
          </h6>

          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsActiveOpen(!isActiveOpen)}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Open
                <i className={`bi ms-auto text-black ${isActiveOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isActiveOpen && <div>{renderPollList(activePolls)}</div>}
            </li>
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsClosedOpen(!isClosedOpen)}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Closed
                <i className={`bi ms-auto text-black ${isClosedOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isClosedOpen && <div>{renderPollList(closedPolls)}</div>}
            </li>
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsInactiveOpen(!isInactiveOpen)}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Inactive
                <i className={`bi ms-auto text-black ${isInactiveOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isInactiveOpen && <div>{renderPollList(inactivePolls)}</div>}
            </li>
          </ul>

          {/* Ustawienia / wylogowanie */}
          <hr className="my-3" />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin/account">
                <i className="bi bi-gear-wide-connected text-black"></i>
                Settings
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link d-flex align-items-center gap-2" onClick={handleLogout}>
                <i className="bi bi-door-closed text-black"></i>
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
