import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminPolls() {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedPolls = JSON.parse(localStorage.getItem("polls")) || [];
    setPolls(storedPolls);
  }, []);

  const handleEdit = (poll) => {
    navigate("/admin/polls/edit", { state: poll });
  };

  return (
    <>
      {/* Poll creation form */}
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">New Poll</h4>
        <form
          className="mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const name = form.new_poll.value.trim();
            const description = form.new_poll_description.value.trim();
            const validTo = form.new_poll_valid_to.value;
            if (!name) return alert("Poll name is required.");

            const newPoll = {
              id: crypto.randomUUID(),
              name,
              description,
              validTo,
              createdAt: new Date().toISOString(),
              createdBy: "Admin",
            };

            const updated = [...polls, newPoll];
            localStorage.setItem("polls", JSON.stringify(updated));
            setPolls(updated);
            form.reset();
          }}
        >
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

          {/* Centered button */}
          <div className="text-center">
            <button type="submit" className="btn btn-success">
              Create poll
            </button>
          </div>
        </form>
      </div>

      {/* Polls table */}
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
                  <td>{poll.validTo || "-"}</td>
                  <td>{poll.createdAt ? new Date(poll.createdAt).toLocaleString() : "-"}</td>
                  <td>{poll.createdBy || "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(poll)}
                    >
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
