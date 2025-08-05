import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditPoll() {
  const { pollId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validTo, setValidTo] = useState("");
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [assignedQuestions, setAssignedQuestions] = useState([]);
  const [initialAssignedQuestions, setInitialAssignedQuestions] = useState([]);


  const sensors = useSensors(useSensor(PointerSensor));

useEffect(() => {
  const fetchData = async () => {
    try {
      const pollRes = await axios.get(`http://localhost:8005/poll-by-id/${pollId}`);
      const poll = pollRes.data.pollData;
      console.log(poll);
      const companyId = pollRes.data.pollData.company_id;

      setName(poll.name || "");
      setDescription(poll.description || "");
      setValidTo(poll.valid_to || "");

      // Fetch assigned questions
      const assignedRes = await axios.get(`http://localhost:8003/getAllQuestions/${pollId}`);
      const assigned = (assignedRes.data.questions || []).map((q) => ({
        id: q.question_id.toString(),
        label: q.question,
      }));
      setAssignedQuestions(assigned);
      setInitialAssignedQuestions(assigned);

      // Fetch tenant questions (e.g. for company_id = 1)
      const tenantRes = await axios.get(`http://localhost:8003/getTenantQuestions/${companyId}`);
      const allQuestions = (tenantRes.data.questions || []).map((q) => ({
        id: q.question_id.toString(),
        label: q.question,
      }));

      // Exclude already assigned
      const assignedIds = new Set(assigned.map((q) => q.id));
      const available = allQuestions.filter((q) => !assignedIds.has(q.id));
      setAvailableQuestions(available);

    } catch (err) {
      console.error(err);
      alert("Nie udało się załadować danych.");
      navigate("/admin/polls");
    }
  };

  fetchData();
}, [pollId, navigate]);



const handleSubmit = async (e) => {
  e.preventDefault();

  const updatedPoll = {
    pollId: parseInt(pollId),
    name: name.trim(),
    description: description.trim(),
    valid_to: validTo,
    is_active: 1,
  };

  try {
    // 1. Zapisz zmiany w poll
    await axios.post("http://localhost:8005/editPoll", updatedPoll);

    // 2. Znajdź pytania do przypisania z aktualnej listy assignedQuestions
    const questionsToAssign = assignedQuestions.map((q, idx) => ({
      question_id: parseInt(q.id),
      sort_order: idx,
    }));

    // 3. Znajdź pytania do usunięcia (te, które były na starcie, a teraz ich nie ma)
    const initialIds = initialAssignedQuestions.map(q => q.id);
    const currentIds = assignedQuestions.map(q => q.id);
    const questionsToRemove = initialIds
      .filter(id => !currentIds.includes(id))
      .map(id => parseInt(id));

    // 4. Usuń pytania, które zostały wyrzucone z assignedQuestions
    await Promise.all(
      questionsToRemove.map((questionId) =>
        axios.delete("http://localhost:8003/unassignQuestionFromPoll", {
          data: { pollId: parseInt(pollId), questionId },
        })
      )
    );

    // 5. Przypisz aktualne pytania (dodaj lub aktualizuj kolejność)
    if (questionsToAssign.length > 0) {
      await axios.post("http://localhost:8003/assignQuestionsToPoll", {
        pollId: parseInt(pollId),
        questions: questionsToAssign,
      });
    }

    // 6. Zaktualizuj initialAssignedQuestions, żeby stan był zsynchronizowany
    setInitialAssignedQuestions(assignedQuestions);

    // 7. Przejdź do listy ankiet
    navigate("/admin/polls");
  } catch (err) {
    console.error("Błąd zapisu:", err);
    alert("Błąd podczas zapisu ankiety.");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="edit_poll_name">Name</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
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

      <GenerateTokens pollId={pollId} />
    </div>
  );
}

// Drag and drop components

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

// GenerateTokens component: bez zmian

// ... zostawiam bez zmian, bo jest poprawny

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
