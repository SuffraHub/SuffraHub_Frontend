import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosWithLogger';

function Reports() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const companyId = 1; // <- możesz pobrać dynamicznie, jeśli masz np. context/logowanie
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Admin | SuffraHub';

    axios.get(`http://localhost:8005/poll-by-company/${companyId}`)
      .then((res) => {
        setPolls(res.data.pollData);
        setLoading(false);
      })
      .catch((err) => {
        setError('Could not fetch polls');
        setLoading(false);
        console.error(err);
      });
  }, [companyId]);

  const handleClick = (pollId) => {
    navigate(`/admin/reports/poll/${pollId}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-2">Poll Reports</h1>
      <span className="text-secondary">Please choose poll</span>

      {loading && <div className="mt-3">Loading...</div>}
      {error && <div className="mt-3 text-danger">{error}</div>}

      {!loading && !error && (
        <ul className="list-group mt-4">
          {polls.map((poll) => (
            <li
              key={poll.id}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleClick(poll.id)}
              style={{ cursor: 'pointer' }}
            >
              <div>
                <strong>{poll.name}</strong>
                <div className="text-muted">Valid to: {new Date(poll.valid_to).toLocaleDateString()}</div>
              </div>
              <span className={`badge ${poll.is_active ? 'bg-success' : 'bg-secondary'}`}>
                {poll.is_active ? 'Active' : 'Inactive'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reports;
