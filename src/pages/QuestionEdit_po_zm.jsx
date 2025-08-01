// to del if works

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuestionEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [question, setQuestion] = useState(data?.question || "");
  const [description, setDescription] = useState(data?.description || "");
  const [hidden, setHidden] = useState(data?.hidden || false);
  const [expireDate, setExpireDate] = useState(data?.expireDate || "");
  const [answerType, setAnswerType] = useState(data?.answerType || "yesno");

  const handleSave = (e) => {
    e.preventDefault();
    const updatedVotes = JSON.parse(localStorage.getItem("votes")) || [];

    const newVotes = updatedVotes.map((vote) =>
      vote.id === data.id
        ? {
            ...vote,
            question,
            description,
            hidden,
            expireDate,
            answerType,
            createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          }
        : vote
    );

    localStorage.setItem("votes", JSON.stringify(newVotes));
    navigate("/admin/questions");
  };

  return (
    <div className="container py-3">
      <div className="card shadow-sm p-4 my-4">
        <h4 className="card-title mb-3">Edit Question</h4>
        <form onSubmit={handleSave}>
          <div className="card-body">
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="question_name"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <label htmlFor="question_name">Question</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
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
                {/* Add more options here if needed */}
              </select>
            </div>

            {/* Read-only fields */}
            <div className="mb-3">
              <label className="form-label">Creation Date</label>
              <input
                type="text"
                className="form-control"
                value={data?.createdAt || ""}
                readOnly
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Created By</label>
              <input
                type="text"
                className="form-control"
                value={data?.createdBy || ""}
                readOnly
                disabled
              />
            </div>

            <div className="row">
              <div className="col text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEdit;
