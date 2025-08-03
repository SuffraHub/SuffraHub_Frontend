import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import "bootstrap-icons/font/bootstrap-icons.css";

const DraggableAnswer = ({ id, label, onDelete, isCustom }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id });
  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    transition,
    padding: "8px 12px",
    margin: "4px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    background: "#fff",
    cursor: "grab",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none",
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span>{label}</span>
      {isCustom && (
        <i
          className="bi bi-x-circle text-danger ms-2"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        ></i>
      )}
    </div>
  );
};

const DroppableColumn = ({ id, children, title, icon, doubleHeight, extraWide }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    minHeight: doubleHeight ? "150px" : "200px",
    padding: "10px",
    border: "2px dashed #aaa",
    backgroundColor: isOver ? "#f8f9fa" : "#fdfdfd",
    borderRadius: "8px",
    width: "100%",
  };

  return (
    <div className={extraWide ? "col-md-6" : "col-md-3"}>
      <h5>
        <i className={`bi ${icon} me-2`}></i>
        {title}
      </h5>
      <div ref={setNodeRef} style={style}>
        {children}
      </div>
    </div>
  );
};

const Questions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const isEditing = Boolean(data && data.id);

  const [question, setQuestion] = useState(data?.question || "");
  const [description, setDescription] = useState(data?.description || "");
  const [hidden, setHidden] = useState(data?.hidden || false);
  const [expireDate, setExpireDate] = useState(data?.expireDate || "");
  const [positiveAnswers, setPositiveAnswers] = useState([]);
  const [negativeAnswers, setNegativeAnswers] = useState([]);
  const [neutralAnswers, setNeutralAnswers] = useState([]);
  const [customAnswers, setCustomAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [newCustom, setNewCustom] = useState("");
  const [allVotes, setAllVotes] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  useEffect(() => {
    const initialAnswers = [
      { label: "Yes", type: "positive" },
      { label: "Agree", type: "positive" },
      { label: "Accept", type: "positive" },
      { label: "No", type: "negative" },
      { label: "Disagree", type: "negative" },
      { label: "Reject", type: "negative" },
      { label: "Maybe", type: "neutral" },
      { label: "Not Sure", type: "neutral" },
    ].map((item) => ({ id: uuidv4(), ...item }));

    setPositiveAnswers(initialAnswers.filter((a) => a.type === "positive"));
    setNegativeAnswers(initialAnswers.filter((a) => a.type === "negative"));
    setNeutralAnswers(initialAnswers.filter((a) => a.type === "neutral"));

    const votes = JSON.parse(localStorage.getItem("votes")) || [];
    setAllVotes(votes);

    if (isEditing) {
      const allAnswers = [...initialAnswers];
      const selected = (data.answerType || []).map((label) => {
        let found = allAnswers.find((a) => a.label === label);
        if (!found) found = { id: uuidv4(), label, type: "custom" };
        return found;
      });
      setSelectedAnswers(selected);
      setCustomAnswers(selected.filter((a) => a.type === "custom"));
    }
  }, [data, isEditing]);

  const removeFromAll = (id) => {
    setPositiveAnswers((prev) => prev.filter((a) => a.id !== id));
    setNegativeAnswers((prev) => prev.filter((a) => a.id !== id));
    setNeutralAnswers((prev) => prev.filter((a) => a.id !== id));
    setCustomAnswers((prev) => prev.filter((a) => a.id !== id));
    setSelectedAnswers((prev) => prev.filter((a) => a.id !== id));
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const draggedItem =
      positiveAnswers.find((a) => a.id === active.id) ||
      negativeAnswers.find((a) => a.id === active.id) ||
      neutralAnswers.find((a) => a.id === active.id) ||
      customAnswers.find((a) => a.id === active.id) ||
      selectedAnswers.find((a) => a.id === active.id);

    if (!draggedItem) return;

    const inSelected = selectedAnswers.find((a) => a.id === active.id);
    const destination = over.id;

    if (!inSelected && destination === "selected") {
      removeFromAll(active.id);
      setSelectedAnswers((prev) => [...prev, draggedItem]);
    } else if (inSelected && destination !== "selected") {
      setSelectedAnswers((prev) => prev.filter((a) => a.id !== active.id));
      const setFn =
        draggedItem.type === "positive"
          ? setPositiveAnswers
          : draggedItem.type === "negative"
          ? setNegativeAnswers
          : draggedItem.type === "neutral"
          ? setNeutralAnswers
          : setCustomAnswers;
      setFn((prev) => [...prev, draggedItem].sort((a, b) => a.label.localeCompare(b.label)));
    }
  };

  const handleAddCustom = () => {
    if (!newCustom.trim()) return;
    const allLabels = [
      ...positiveAnswers,
      ...negativeAnswers,
      ...neutralAnswers,
      ...customAnswers,
      ...selectedAnswers,
    ].map((a) => a.label.toLowerCase());

    if (allLabels.includes(newCustom.trim().toLowerCase())) {
      alert("This answer already exists.");
      return;
    }

    const newEntry = { id: uuidv4(), label: newCustom.trim(), type: "custom" };
    setCustomAnswers((prev) => [...prev, newEntry].sort((a, b) => a.label.localeCompare(b.label)));
    setNewCustom("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("Question cannot be empty.");
      return;
    }
    if (selectedAnswers.length === 0) {
      alert("Select at least one answer.");
      return;
    }

    const votes = JSON.parse(localStorage.getItem("votes")) || [];

    if (isEditing) {
      const updatedVotes = votes.map((vote) =>
        vote.id === data.id
          ? {
              ...vote,
              question,
              description,
              hidden,
              expireDate,
              answerType: selectedAnswers.map((a) => a.label),
              createdAt: data.createdAt,
              createdBy: data.createdBy,
            }
          : vote
      );
      localStorage.setItem("votes", JSON.stringify(updatedVotes));
      setAllVotes(updatedVotes);
    } else {
      const newQuestion = {
        id: uuidv4(),
        question,
        description,
        hidden,
        expireDate,
        answerType: selectedAnswers.map((a) => a.label),
        createdAt: new Date().toISOString(),
        createdBy: "Admin",
      };
      const newVotes = [...votes, newQuestion];
      localStorage.setItem("votes", JSON.stringify(newVotes));
      setAllVotes(newVotes);
      setQuestion("");
      setDescription("");
      setHidden(false);
      setExpireDate("");
      setSelectedAnswers([]);
      setCustomAnswers([]);
    }

    navigate("/admin/questions");
  };

  const handleEditClick = (vote) => {
    navigate("/admin/questions/edit", { state: vote });
  };

  return (
    <div className="container py-3">
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">{isEditing ? "Edit Question" : "Add Question"}</h4>
        <form onSubmit={handleSave}>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Question"
              required
            />
            <label>Question</label>
          </div>

          <div className="form-floating mb-3">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <label>Description</label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={hidden}
              onChange={() => setHidden(!hidden)}
              id="hidden"
            />
            <label className="form-check-label" htmlFor="hidden">
              Hidden
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">Expire Date</label>
            <input
              type="date"
              className="form-control"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="row g-4">
              <DroppableColumn id="positive" title="Positive" icon="bi-hand-thumbs-up">
                {positiveAnswers.sort((a, b) => a.label.localeCompare(b.label)).map((a) => (
                  <DraggableAnswer key={a.id} id={a.id} label={a.label} />
                ))}
              </DroppableColumn>

              <DroppableColumn id="negative" title="Negative" icon="bi-hand-thumbs-down">
                {negativeAnswers.sort((a, b) => a.label.localeCompare(b.label)).map((a) => (
                  <DraggableAnswer key={a.id} id={a.id} label={a.label} />
                ))}
              </DroppableColumn>

              <DroppableColumn id="neutral" title="Neutral" icon="bi-question-circle">
                {neutralAnswers.sort((a, b) => a.label.localeCompare(b.label)).map((a) => (
                  <DraggableAnswer key={a.id} id={a.id} label={a.label} />
                ))}
              </DroppableColumn>

              <DroppableColumn id="custom" title="Custom" icon="bi-pencil-square">
                {customAnswers.sort((a, b) => a.label.localeCompare(b.label)).map((a) => (
                  <DraggableAnswer
                    key={a.id}
                    id={a.id}
                    label={a.label}
                    isCustom
                    onDelete={removeFromAll}
                  />
                ))}
                <div className="input-group mt-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add custom answer"
                    value={newCustom}
                    onChange={(e) => setNewCustom(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCustom();
                      }
                    }}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={handleAddCustom}>
                    Add
                  </button>
                </div>
              </DroppableColumn>

              <DroppableColumn id="selected" title="Selected Answers" icon="bi-check-circle" doubleHeight extraWide>
                {selectedAnswers.sort((a, b) => a.label.localeCompare(b.label)).map((a) => (
                  <DraggableAnswer
                    key={a.id}
                    id={a.id}
                    label={a.label}
                    isCustom={a.type === "custom"}
                    onDelete={removeFromAll}
                  />
                ))}
              </DroppableColumn>
            </div>
          </DndContext>

          <div className="row mt-4">
            <div className="col text-center">
              <button type="submit" className="btn btn-success">
                {isEditing ? "Update Question" : "Save Question"}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="card p-4 my-4">
        <h5>All Questions</h5>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Description</th>
              <th>Hidden</th>
              <th>Expire Date</th>
              <th>Answers</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {allVotes.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center">
                  No questions added yet.
                </td>
              </tr>
            )}
            {allVotes.map((vote) => (
              <tr key={vote.id}>
                <td>{vote.id}</td>
                <td>{vote.question}</td>
                <td>{vote.description}</td>
                <td>{vote.hidden ? "Yes" : "No"}</td>
                <td>{vote.expireDate}</td>
                <td>
                  {Array.isArray(vote.answerType)
                    ? vote.answerType.join(", ")
                    : String(vote.answerType) || "-"}
                </td>
                <td>{vote.createdAt ? new Date(vote.createdAt).toLocaleString() : "-"}</td>
                <td>{vote.createdBy || "-"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditClick(vote)}
                    aria-label={`Edit question ${vote.question}`}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Questions;
