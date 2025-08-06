import { useEffect, useState } from 'react';
import axios from "axios";

function Admin() {
  const [expiringPolls, setExpiringPolls] = useState([]);
  const [recentLogs, setRecentLogs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    document.title = 'Admin | SuffraHub';

    // Fetch user info
    async function fetchUser() {
      try {
        const userRes = await axios.get('http://localhost:8000/user-info', {
          withCredentials: true
        });
        const userData = userRes.data;
        setUserInfo(userData); // zapisz dane do stanu
      } catch (error) {
        console.error('Błąd podczas pobierania danych użytkownika:', error);
      }
    }

    fetchUser();

    // Fetch expiring polls
    const polls = JSON.parse(localStorage.getItem("polls")) || [];

    const upcoming = polls.filter((poll) => {
      if (!poll.validTo) return false;
      const expiryDate = new Date(poll.validTo);
      const now = new Date();
      const diffDays = (expiryDate - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 7;
    });

    setExpiringPolls(upcoming);

    // Fetch recent logs
    axios.post('http://localhost:8006/api/logs/recent')
      .then(res => {
        setRecentLogs(res.data);
      })
      .catch(err => {
        console.error("Error fetching recent logs:", err);
      });

  }, []);

const currentUser = userInfo ? (
  <>
    {userInfo.name} {userInfo.surname} ({userInfo.username}) as <b>{userInfo.permissions_desc}</b>
  </>
) : (
  'Nieznany użytkownik'
);


  const changelog = [
    { date: '2025-08-04', change: 'Added poll editing feature' },
    { date: '2025-08-03', change: 'Fixed question description styling' },
    { date: '2025-08-02', change: 'Removed extra header above poll form' },
    { date: '2025-08-01', change: 'Initial admin dashboard setup' },
  ];

  return (
    <>

      <h1 className="mb-4">Admin Panel</h1>

      {/* Changelog */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Recent Changes</h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {recentLogs.map(log => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td>{log.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Warnings + Logged-in Info */}
      <div className="card p-4 shadow-sm">
        <h5 className="mb-3">System Overview</h5>
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th>Currently Logged In</th>
              <td>{currentUser}</td>
            </tr>
            <tr>
              <th>Polls Expiring Soon</th>
              <td>
                {expiringPolls.length === 0 ? (
                  <span className="text-success">No polls expiring in the next 7 days.</span>
                ) : (
                  <ul className="mb-0">
                    {expiringPolls.map((poll) => (
                      <li key={poll.id}>
                        <strong>{poll.name}</strong> — expires on{" "}
                        {new Date(poll.validTo).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Admin;
