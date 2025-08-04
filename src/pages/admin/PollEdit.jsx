import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditPoll() {
  const location = useLocation();
  const navigate = useNavigate();
  const poll = location.state;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validTo, setValidTo] = useState("");

  useEffect(() => {
    if (!poll) {
      navigate("/admin/polls");
      return;
    }

    setName(poll.name || "");
    setDescription(poll.description || "");
    setValidTo(poll.validTo || "");
  }, [poll, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPoll = {
      ...poll,
      name: name.trim(),
      description: description.trim(),
      validTo,
    };

    const stored = JSON.parse(localStorage.getItem("polls")) || [];
    const updated = stored.map((p) => (p.id === poll.id ? updatedPoll : p));
    localStorage.setItem("polls", JSON.stringify(updated));
    navigate("/admin/polls");
  };

  return (
    <div className="card shadow-sm p-4 my-4">
      <h4 className="card-title mb-3">Edit Poll</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-2">
          <input
            type="text"
            className="form-control"
            id="edit_poll_name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="edit_poll_name">Name</label>
        </div>

        <div className="form-floating mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            id="edit_poll_description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="edit_poll_description">Description</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="datetime-local"
            className="form-control"
            id="edit_poll_valid_to"
            placeholder="Expiry date"
            value={validTo}
            onChange={(e) => setValidTo(e.target.value)}
          />
          <label htmlFor="edit_poll_valid_to">Expiry date</label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPoll;
