import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminPolls() {
  const [polls, setPolls] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // 1. Pobierz dane użytkownika
  useEffect(() => {
    fetch("http://localhost:8000/user-info", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user session");
        return res.json();
      })
      .then((data) => {
        if (data.loggedIn) {
          setCompanyId(data.company_id);
          const companyId = data.company_id;
          setUserId(data.user_id);
        } else {
          alert("Nie jesteś zalogowany");
          navigate("/user/login");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Błąd pobierania sesji użytkownika");
      });
  }, [navigate]);

  // 2. Gdy mamy companyId, pobierz ankiety tej firmy
  useEffect(() => {
    if (!companyId) return;

    fetch(`http://localhost:8005/poll-by-company/${companyId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch polls");
        return res.json();
      })
      .then((data) => setPolls(data.pollData))
      .catch((err) => console.error(err));
  }, [companyId]);

  // Obsługa edycji
  const handleEdit = (poll) => {
    navigate(`/admin/polls/edit/${poll.id}`);
  };

  // 3. Obsługa tworzenia ankiety
  const handleCreatePoll = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.new_poll.value.trim();
    const description = form.new_poll_description.value.trim();
    const validTo = form.new_poll_valid_to.value;

    if (!name) return alert("Poll name is required.");

    fetch("http://localhost:8005/createPoll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        is_active: true,
        owner_id: userId,
        company_id: companyId,
        valid_to: validTo,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to create poll");
        return res.json();
      })
      .then(() =>
        fetch(`http://localhost:8005/poll-by-company/${companyId}`)
          .then((res) => res.json())
          .then((data) => setPolls(data.pollData))
      )
      .then(() => form.reset())
      .catch((err) => {
        console.error(err);
        alert("Poll creation failed.");
      });
  };

  return (
    <>
      {/* Form tworzenia ankiety */}
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">New Poll</h4>
        <form className="mb-4" onSubmit={handleCreatePoll}>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              id="poll_name"
              name="new_poll"
              placeholder="Name"
            />
            <label htmlFor="poll_name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Description"
              id="poll_description"
              name="new_poll_description"
            />
            <label htmlFor="poll_description">Description</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="datetime-local"
              className="form-control"
              id="poll_valid_to"
              name="new_poll_valid_to"
              placeholder="Expiry"
            />
            <label htmlFor="poll_valid_to">Expiry date</label>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Create poll
            </button>
          </div>
        </form>
      </div>

      {/* Tabela ankiet */}
      <div className="card p-4 my-4">
        <h5>All Polls</h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Expires</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {polls.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No polls created yet.
                </td>
              </tr>
            ) : (
              polls.map((poll) => (
                <tr key={poll.id}>
                  <td>{poll.id}</td>
                  <td>{poll.name}</td>
                  <td>{poll.description || "-"}</td>
                  <td>{poll.valid_to ? new Date(poll.valid_to).toLocaleString() : "-"}</td>
                  <td>{poll.created_at ? new Date(poll.created_at).toLocaleString() : "-"}</td>
                  <td>{poll.created_by || "-"}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(poll)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminPolls;
