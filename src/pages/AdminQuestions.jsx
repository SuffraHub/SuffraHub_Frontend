import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminQuestions() {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState(false);
  const [expireDate, setExpireDate] = useState("");
  const [answerType, setAnswerType] = useState("yesno");
  const [votes, setVotes] = useState([]);

  const navigate = useNavigate();

  // Load votes from localStorage or mock data
  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes"));
    if (storedVotes && storedVotes.length > 0) {
      setVotes(storedVotes);
    } else {
      const mockVotes = [
        {
          id: 1,
          question: "Do you like our service?",
          description: "Pick one from the list",
          hidden: false,
          expireDate: "2025-08-15",
          createdAt: "2025-07-10 10:00:00",
          createdBy: "Jane Doe (janedoe)",
          answerType: "yesno",
          answers: ["Yes", "No"],
        },
        {
          id: 2,
          question: "Do you prefer online voting?",
          description: "Choose your answer",
          hidden: true,
          expireDate: "2025-09-01",
          createdAt: "2025-07-20 15:00:00",
          createdBy: "Admin (adminuser)",
          answerType: "yesno",
          answers: ["Yes", "No"],
        },
      ];
      setVotes(mockVotes);
      localStorage.setItem("votes", JSON.stringify(mockVotes));
    }
  }, []);

  const resetForm = () => {
    setQuestion("");
    setDescription("");
    setHidden(false);
    setExpireDate("");
    setAnswerType("yesno");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    const newId = votes.length > 0 ? Math.max(...votes.map((v) => v.id)) + 1 : 1;
    const now = new Date();
    const formattedNow = now.toISOString().slice(0, 19).replace("T", " ");

    const newQuestion = {
      id: newId,
      question,
      description,
      hidden,
      expireDate,
      createdAt: formattedNow,
      createdBy: "Current User (currentuser)", // change as needed
      answerType,
      answers: answerType === "yesno" ? ["Yes", "No"] : [],
    };

    const updatedVotes = [...votes, newQuestion];
    setVotes(updatedVotes);
    localStorage.setItem("votes", JSON.stringify(updatedVotes));

    resetForm();
  };

  const handleEdit = (vote) => {
    navigate("/admin/questions/edit", { state: vote });
  };

  return (
    <div className="container py-3">
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">Create New Question</h4>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="card-body">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="question_name"
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <label htmlFor="question_name">Question</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Description"
                id="question_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="question_description">Description</label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="hidden"
                checked={hidden}
                onChange={() => setHidden(!hidden)}
              />
              <label className="form-check-label" htmlFor="hidden">
                Hidden
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="expire_date" className="form-label">
                Expire Date
              </label>
              <input
                type="date"
                className="form-control"
                id="expire_date"
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="answer_type" className="form-label">
                Select Predefined Answers
              </label>
              <select
                className="form-select"
                id="answer_type"
                value={answerType}
                onChange={(e) => setAnswerType(e.target.value)}
              >
                <option value="yesno">Yes / No</option>
              </select>
            </div>

            <div className="row">
              <div className="col text-center">
                <button type="submit" className="btn btn-success">
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <h5>Tenant's Questions</h5>
      <div className="card shadow-sm p-4 my-3">
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Description</th>
                <th>Hidden</th>
                <th>Expire Date</th>
                <th>Creation Date</th>
                <th>Created By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {votes.map((vote, index) => (
                <tr key={vote.id}>
                  <td>{index + 1}</td>
                  <td>{vote.question}</td>
                  <td>{vote.description}</td>
                  <td>{vote.hidden ? "Yes" : "No"}</td>
                  <td>{vote.expireDate}</td>
                  <td>{vote.createdAt}</td>
                  <td>{vote.createdBy}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(vote)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
              {votes.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center">
                    No questions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminQuestions;
