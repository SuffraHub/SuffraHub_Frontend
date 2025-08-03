import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PollSummary() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [token, setToken] = useState('example-token');
  const [pollId, setPollId] = useState(123);

  // Na początek ustawiamy w localStorage przykładowe dane (możesz potem to usunąć)
  useEffect(() => {
    document.title = 'Summary | SuffraHub';

    const exampleAnswers = {
      1: '1',
      2: '2',
      3: '3',
    };
    localStorage.setItem('answers', JSON.stringify(exampleAnswers));
    localStorage.setItem('token', '360045');
    localStorage.setItem('pollId', '4');

    // Pobieramy dane z localStorage
    const storedAnswers = localStorage.getItem('answers');
    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }

    const storedToken = localStorage.getItem('token');
    if (storedToken) setToken(storedToken);

    const storedPollId = localStorage.getItem('pollId');
    if (storedPollId) setPollId(parseInt(storedPollId));
  }, []);

  const handleSubmit = async () => {
    const votes = Object.entries(answers).map(([question_poll_id, option_id]) => ({
      question_poll_id: parseInt(question_poll_id),
      option_id
    }));

    const res = await fetch('http://localhost:8002/submit-votes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, poll_id: pollId, votes })
    });

    if (res.ok) {
      alert('Głosowanie zakończone!');
      navigate('/');
    } else {
      const err = await res.json();
      alert('Błąd: ' + err.error);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column" style={{ minHeight: '80vh' }}>
        <div className="row">
          <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
              <h1 className="text-body-emphasis text-start mt-3 h1">
                <div className="d-flex align-items-center">
                  <span className="text-secondary">#</span>
                  <b>Podsumowanie</b>
                  <span className="h3 ms-3 mb-0">Twoje odpowiedzi</span>
                </div>
              </h1>

              <ul className="list-group mt-4 text-start">
                {Object.entries(answers).map(([qId, oId]) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={qId}>
                    <span>Pytanie <b>{qId}</b></span>
                    <span className="badge bg-primary rounded-pill">Opcja {oId}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4">
                <button
                  className="btn btn-success btn-lg px-4"
                  onClick={handleSubmit}
                >
                  Zatwierdź i zakończ
                </button>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => navigate('/question/1')}
                >
                  Wróć do początku
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PollSummary;
