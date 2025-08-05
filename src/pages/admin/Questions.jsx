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
import axios from "axios";

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
  const [positiveAnswers, setPositiveAnswers] = useState([]);
  const [negativeAnswers, setNegativeAnswers] = useState([]);
  const [neutralAnswers, setNeutralAnswers] = useState([]);
  const [customAnswers, setCustomAnswers] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [newType, setNewType] = useState('custom');
  const [newCustom, setNewCustom] = useState("");
  const [allQuestions, setallQuestions] = useState([]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

useEffect(() => {
  const fetchData = async () => {
    try {
      // 1. Pobierz dane użytkownika z sesji
      const userRes = await axios.get("http://localhost:8000/user-info", { withCredentials: true });
      const companyId = userRes.data.company_id;

      // 3. Pobierz opcje odpowiedzi
      const optionsRes = await axios.get(`http://localhost:8003/getOptions/${companyId}`);
      const rawOptions = optionsRes.data.options || [];

      // 4. Przekształć dane z backendu do formatu komponentu
      const parsedOptions = rawOptions.map((opt) => ({
        id: opt.option_id || uuidv4(), // zakładam, że option_id to unikalne ID z bazy
        label: opt.label,
        type: opt.type || "neutral" // fallback na neutral, jeśli nie ma
      }));

      setPositiveAnswers(parsedOptions.filter((a) => a.type === "positive"));
      setNegativeAnswers(parsedOptions.filter((a) => a.type === "negative"));
      setNeutralAnswers(parsedOptions.filter((a) => a.type === "neutral"));

      // 5. Przy edycji pytania – odtwórz odpowiedzi
      if (isEditing) {
        const selected = (data.answerType || []).map((label) => {
          let found = parsedOptions.find((a) => a.label === label);
          if (!found) found = { id: uuidv4(), label, type: "custom" };
          return found;
        });
        setSelectedAnswers(selected);
        setCustomAnswers(selected.filter((a) => a.type === "custom"));
      }
    } catch (err) {
      console.error("Błąd podczas pobierania danych:", err);
      setAllVotes([]);
    }
  };

  fetchData();
  

  const fetchQuestions = async () => {
    try {
      // Pobierz dane sesji użytkownika
      const userRes = await axios.get("http://localhost:8000/user-info", { withCredentials: true });
      const companyId = userRes.data.company_id;
      //console.log(userRes.data.company_id);

      // Pobierz pytania dla firmy
      const response = await axios.get(`http://localhost:8003/getTenantQuestions/${companyId}`);
      setallQuestions(response.data.questions || []);
      console.log(response.data.questions);
    } catch (error) {
      console.error("Error fetching tenant questions:", error);
      setallQuestions([]); // fallback
    }
  };

  fetchQuestions();
  

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


  const fetchOptions = async () => {
      const userRes = await axios.get("http://localhost:8000/user-info", { withCredentials: true });
      const companyId = userRes.data.company_id;

  try {
    const res = await axios.get(`http://localhost:8003/getOptions/${companyId}`);
    const options = res.data.options;

    setPositiveAnswers(options.filter((o) => o.type === "positive"));
    setNegativeAnswers(options.filter((o) => o.type === "negative"));
    setNeutralAnswers(options.filter((o) => o.type === "neutral"));
    setCustomAnswers(options.filter((o) => o.type === "custom"));
  } catch (err) {
    console.error("Failed to fetch options:", err);
  }
};


const allowedTypes = ['positive', 'negative', 'neutral', 'custom'];

const handleAddCustom = async () => {
        const userRes = await axios.get("http://localhost:8000/user-info", { withCredentials: true });
      const companyId = userRes.data.company_id;
  if (!newCustom.trim()) return;

  if (!companyId) {
    alert('Missing company ID');
    return;
  }

  if (!allowedTypes.includes(newType)) {
    alert('Invalid type selected.');
    return;
  }

  const allLabels = [
    ...positiveAnswers,
    ...negativeAnswers,
    ...neutralAnswers,
    ...customAnswers,
    ...selectedAnswers,
  ].map((a) => a.label.toLowerCase());

  const trimmed = newCustom.trim();

  if (allLabels.includes(trimmed.toLowerCase())) {
    alert('This answer already exists.');
    return;
  }

  try {
    await axios.post('http://localhost:8003/addOption', {
      label: trimmed,
      company_id: companyId,
      type: newType,
    });

    setNewCustom('');
    fetchOptions();
  } catch (err) {
    console.error('Failed to add option', err);
    alert('Error adding option.');
  }
};


const handleDeleteCustom = async (id) => {
  try {
    await axios.delete(`http://localhost:8003/deleteOption/${id}`);
    fetchOptions(); // odśwież listę z backendu
    removeFromAll(id); // usuń z wybranych (jeśli tam było)
  } catch (err) {
    console.error('Failed to delete option', err);
    alert('Error deleting option.');
  }
};


const handleSave = async (e) => {
  e.preventDefault();

  if (!question.trim()) return alert("Question cannot be empty.");
  if (selectedAnswers.length === 0) return alert("Select at least one answer.");

  try {
    const userRes = await axios.get("http://localhost:8000/user-info", { withCredentials: true });
    const companyId = userRes.data.company_id;
    const userId = userRes.data.user_id;

    const payload = {
      question,
      description: description ?? "",
      hidden: hidden ?? 0,
      user_id: userId,
      company_id: companyId
    };

    const res = await axios.post("http://localhost:8003/createQuestion", payload);
    const questionId = res.data.questionId;

    const labels = selectedAnswers.map(a => a.label);

    await axios.post("http://localhost:8003/addOptionsToQuestion", {
      questionId,
      labels,
      tenantId: companyId
    });

    navigate("/admin/questions");
  } catch (err) {
    console.error("Failed to save question:", err);
    alert("Error while saving question.");
  }
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
  {customAnswers
    .sort((a, b) => a.label.localeCompare(b.label))
    .map((a) => (
      <DraggableAnswer
        key={a.id}
        id={a.id}
        label={a.label}
        isCustom
        onDelete={() => handleDeleteCustom(a.id)}
      />
    ))}

  <select
    className="form-select mt-2"
    value={newType}
    onChange={(e) => setNewType(e.target.value)}
  >
    <option value="custom">Custom</option>
    <option value="positive">Positive</option>
    <option value="negative">Negative</option>
    <option value="neutral">Neutral</option>
  </select>

  <div className="input-group mt-2">
    <input
      type="text"
      className="form-control"
      placeholder="Add answer"
      value={newCustom}
      onChange={(e) => setNewCustom(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAddCustom();
        }
      }}
    />
    <button
      type="button"
      className="btn btn-outline-primary"
      onClick={handleAddCustom}
    >
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
              <th>Answers</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
{allQuestions.length === 0 && (
  <tr key="no-questions">
    <td colSpan="9" className="text-center">
      No questions added yet.
    </td>
  </tr>
)}

            {allQuestions.map((vote) => (
              <tr key={vote.question_id}>
                <td>{vote.question_id}</td>
                <td>{vote.question}</td>
                <td>{vote.description}</td>
                <td>{vote.hidden ? "Yes" : "No"}</td>
                <td>
                  {Array.isArray(vote.answerType)
                    ? vote.answerType.join(", ")
                    : String(vote.answerType) || "-"}
                </td>
                <td>{vote.created_at ? new Date(vote.created_at).toLocaleString() : "-"}</td>
                <td>{vote.user_it || "-"}</td>
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
