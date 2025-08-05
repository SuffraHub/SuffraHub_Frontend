import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PollSummary() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [token, setToken] = useState('example-token');
  const [pollId, setPollId] = useState(123);
  const [pollName, setPollName] = useState('');


  useEffect(() => {
    document.title = 'Summary | SuffraHub';
    

    // Przykładowe dane zgodne z nową strukturą
    // const exampleAnswers = {
    //   1: {
    //     question_poll_id: 1,
    //     question: "Do you agree with $1?",
    //     option_id: 10,
    //     answer: "Yes"
    //   },
    //   2: {
    //     question_poll_id: 2,
    //     question: "Do you agree with $2?",
    //     option_id: 20,
    //     answer: "Hold"
    //   },
    //   3: {
    //     question_poll_id: 3,
    //     question: "Do you agree with $3?",
    //     option_id: 30,
    //     answer: "No"
    //   }
    // };
    // localStorage.setItem('answers', JSON.stringify(exampleAnswers));
    // localStorage.setItem('token', '719829');
    // localStorage.setItem('pollId', '4');
    // localStorage.setItem('pollName', 'Afera MOP Sławoszewo');
    const storedPollName = localStorage.getItem('pollName');
    if (storedPollName) setPollName(storedPollName);


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
  const votes = Object.values(answers).map(({ question_poll_id, option_id }) => ({
    question_poll_id,
    option_id
  }));

  const res = await fetch('http://localhost:8002/submit-votes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, poll_id: pollId, votes })
  });

  if (res.ok) {
    // 🧹 Czyszczenie danych z localStorage
    localStorage.removeItem('answers');
    localStorage.removeItem('token');
    localStorage.removeItem('pollId');
    localStorage.removeItem('pollName');

    alert('Poll finished!');
    navigate('/');
  } else {
    const err = await res.json();
    alert('Błąd: ' + err.error);
  }
};


  return (
    <div className="container d-flex flex-column" style={{ minHeight: '80vh' }}>
      <div className="row">
        <div className="container my-5">
          <div className="p-5 text-center bg-body-tertiary rounded-3">
            <h1 className="text-body-emphasis text-start mt-3 h1">
              <div className="d-flex align-items-center">
                <span className="text-secondary">#</span>
                <b>{pollName} Summary</b>
                <span className="h3 ms-3 mb-0">Your answers</span>
              </div>
            </h1>

            <ul className="list-group mt-4 text-start">
              {Object.entries(answers).map(([qId, entry]) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={qId}
                >
                  <div>
                    <div className="fw-bold">Pytanie {entry.question_poll_id}</div>
                    <div>{entry.question}</div>
                  </div>
                  <span className="badge bg-primary rounded-pill">
                    {entry.answer}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <button
                className="btn btn-success btn-lg px-4"
                onClick={handleSubmit}
              >
                Submit and close
              </button>
            </div>

            <div className="mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => navigate('/')}
              >
                Return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollSummary;
