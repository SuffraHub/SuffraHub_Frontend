import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";

function EditPoll() {
  const location = useLocation();
  const navigate = useNavigate();
  const poll = location.state;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validTo, setValidTo] = useState("");
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [assignedQuestions, setAssignedQuestions] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    if (!poll) {
      navigate("/admin/polls");
      return;
    }

    setName(poll.name || "");
    setDescription(poll.description || "");
    setValidTo(poll.validTo || "");

    // Dummy available questions (should be replaced by real data from API)
    const dummy = [
      { id: "q1", label: "Czy popierasz projekt A?" },
      { id: "q2", label: "Czy zgadzasz się z punktem B?" },
      { id: "q3", label: "Twoja opinia na temat C?" },
    ];
    setAvailableQuestions(dummy);
    setAssignedQuestions(poll.questions || []); // zakładamy, że są w poll.questions
  }, [poll, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPoll = {
      id: poll.id,
      name: name.trim(),
      description: description.trim(),
      validTo,
      questions: assignedQuestions.map((q) => q.id),
    };

    try {
      await axios.put("http://localhost:8005/update-poll", updatedPoll);
      navigate("/admin/polls");
    } catch (err) {
      console.error("Błąd aktualizacji głosowania:", err);
      alert("Wystąpił błąd przy zapisie.");
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const draggedFromAvailable = availableQuestions.find((q) => q.id === active.id);
    const draggedFromAssigned = assignedQuestions.find((q) => q.id === active.id);

    if (draggedFromAvailable && over.id === "assigned") {
      setAvailableQuestions((prev) => prev.filter((q) => q.id !== active.id));
      setAssignedQuestions((prev) => [...prev, draggedFromAvailable]);
    }

    if (draggedFromAssigned && over.id === "available") {
      setAssignedQuestions((prev) => prev.filter((q) => q.id !== active.id));
      setAvailableQuestions((prev) => [...prev, draggedFromAssigned]);
    }
  };

  return (
    <div className="container">
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
              required
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
              required
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
              required
            />
            <label htmlFor="edit_poll_valid_to">Expiry date</label>
          </div>

          <div className="card my-4 p-3">
            <h5>Assign Questions</h5>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <div className="row g-4">
                <DroppableBox id="available" title="Available Questions">
                  {availableQuestions.map((q) => (
                    <DraggableQuestion key={q.id} id={q.id} label={q.label} />
                  ))}
                </DroppableBox>

                <DroppableBox id="assigned" title="Assigned to Poll">
                  {assignedQuestions.map((q) => (
                    <DraggableQuestion key={q.id} id={q.id} label={q.label} />
                  ))}
                </DroppableBox>
              </div>
            </DndContext>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <GenerateTokens pollId={poll?.id} />
    </div>
  );
}

// ============ Drag and Drop Helpers ============

const DraggableQuestion = ({ id, label }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    padding: "10px",
    marginBottom: "6px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
};

const DroppableBox = ({ id, title, children }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    backgroundColor: isOver ? "#f1f1f1" : "#fdfdfd",
    padding: "15px",
    border: "2px dashed #aaa",
    minHeight: "200px",
    borderRadius: "8px",
  };

  return (
    <div className="col-md-6">
      <h6 className="mb-2">{title}</h6>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </div>
  );
};

// ============ Tokens Section (unchanged) ============

function GenerateTokens({ pollId: initialPollId }) {
  const [pollId, setPollId] = useState(initialPollId || "");
  const [tokenQuantity, setTokenQuantity] = useState("");
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [pollName, setPollName] = useState("");

  useEffect(() => {
    if (!pollId) return;

    setLoadingTokens(true);
    setError("");

    axios
      .get(`http://localhost:8005/tokens-by-poll/${pollId}`)
      .then((res) => {
        setTokens(res.data.tokens || []);
        setPollName(res.data.pollName || "");
      })
      .catch((err) => {
        setError(
          err.response?.data?.error ||
            "Błąd podczas pobierania tokenów lub brak tokenów."
        );
        setTokens([]);
      })
      .finally(() => {
        setLoadingTokens(false);
      });
  }, [pollId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!pollId || !tokenQuantity) {
      setError("Wszystkie pola są wymagane.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8005/generate-tokens", {
        pollId: parseInt(pollId),
        tokenQuantity: parseInt(tokenQuantity),
      });

      const refreshed = await axios.get(`http://localhost:8005/tokens-by-poll/${pollId}`);
      setTokens(refreshed.data.tokens || []);
      setPollName(refreshed.data.pollName || "");
    } catch (err) {
      setError(err.response?.data?.error || "Błąd serwera");
    }
    setLoading(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "0000-00-00 00:00:00") return "-";
    return new Date(dateStr).toLocaleString();
  };

  return (
    <div className="card align-items-center d-flex justify-content-center py-4 w-100">
      <h2>Tokens</h2>

      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <input type="hidden" value={pollId} disabled />
        <div className="mb-3">
          <label>
            How many?
            <input
              type="number"
              value={tokenQuantity}
              onChange={(e) => setTokenQuantity(e.target.value)}
              min="1"
              required
              className="form-control"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {loadingTokens && <p>Loading tokens...</p>}
      {error && <p className="text-danger mt-2">{error}</p>}

      {tokens.length > 0 && !loadingTokens && (
        <div className="container p-3 w-100">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <button className="btn btn-outline-secondary" onClick={() => window.print()}>
              Drukuj PDF
            </button>
          </div>

          <div className="printable-area">
            <h5 className="mb-0">
              Tokens for poll: <strong>{pollName}</strong>
            </h5>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Status</th>
                  <th>Used At</th>
                  <th>Generated At</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map(({ token, used, used_at, generated_at }) => (
                  <tr key={token}>
                    <td>{token}</td>
                    <td>
                      {used ? (
                        <span className="badge bg-danger">Used</span>
                      ) : (
                        <span className="badge bg-success">Unused</span>
                      )}
                    </td>
                    <td>{formatDate(used_at)}</td>
                    <td>{formatDate(generated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditPoll;
