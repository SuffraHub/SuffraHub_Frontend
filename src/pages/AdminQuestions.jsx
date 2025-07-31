import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AdminQuestion() {
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [hidden, setHidden] = useState(false);
  const [expireDate, setExpireDate] = useState("");
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const mockVotes = [
      {
        id: 1,
        question: "What’s your favorite color?",
        description: "Pick one from the list",
        hidden: false,
        expireDate: "2025-08-15",
        createdAt: "2025-07-10",
        createdBy: "Jane Doe (janedoe)",
      },
      {
        id: 2,
        question: "Which city do you prefer?",
        description: "Choose your favorite",
        hidden: true,
        expireDate: "2025-09-01",
        createdAt: "2025-07-20",
        createdBy: "Admin (adminuser)",
      },
    ];
    setVotes(mockVotes);
  }, []);

  return (
    <div className="container py-3">
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">Create New Question</h4>
        <form className="mb-4">
          <div className="card-body">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="question_name"
                name="new_question"
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
                name="new_question_description"
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
          </div>
          <button type="submit" className="btn btn-success">
            Save Question
          </button>
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
                    <button className="btn btn-sm btn-primary">Edit</button>
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

export default AdminQuestion;
