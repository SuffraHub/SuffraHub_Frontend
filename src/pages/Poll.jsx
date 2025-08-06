import { useOutletContext, useNavigate } from 'react-router-dom';
import Question from '../components/poll/Question';

function PollPage() {
  const { pollData, selectedQuestion, setSelectedQuestion } = useOutletContext();
  console.log("Data:", pollData);
  const navigate = useNavigate();

  if (!selectedQuestion) {
    return <p>Wybierz pytanie z panelu bocznego.</p>;
  }

  const current = selectedQuestion.number;
  const total = selectedQuestion.total;

  const prev = current > 1 ? current - 1 : null;
  const next = current < total ? current + 1 : null;

  const goToQuestion = (number) => {
    const q = pollData.questions.find(q => q.number === number);
    if (q) setSelectedQuestion(q);
  };

  return (
    <div className="container d-flex flex-column" style={{ minHeight: '80vh' }}>
      <div className="row">
        <div className="container my-5">
          <div className="p-5 text-center bg-body-tertiary rounded-3">

            {/* Pytanie */}
            <Question data={selectedQuestion} pollId={pollData.pollId} />

            {/* Przycisk Help */}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              style={{ color: '#6f42c1' }}
              data-bs-toggle="modal"
              data-bs-target="#helpModal"
            >
              <i className="bi bi-question-circle-fill me-1"></i>
              Help
            </button>

            <div
              className="modal fade"
              id="helpModal"
              tabIndex="-1"
              aria-labelledby="helpModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="helpModalLabel">Need Help?</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    This is some helpful information or instructions.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Nawigacja */}
      <div className="row mt-auto mb-4">
        <div className="d-flex justify-content-center align-items-center gap-3">
          {/* Poprzednie */}
          <button
            className="btn btn-outline-primary"
            disabled={!prev}
            onClick={() => prev && goToQuestion(prev)}
          >
            &larr; Back
          </button>

          {/* Numer pytania */}
          <span className="fs-5">Pytanie {current} z {total}</span>

          {/* Następne lub Zakończ */}
          {!next ? (
            <button
              className="btn btn-success"
              onClick={() => navigate('/poll/summary')}
            >
              Submit
            </button>
          ) : (
            <button
              className="btn btn-outline-primary"
              onClick={() => goToQuestion(next)}
            >
              Next &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PollPage;
