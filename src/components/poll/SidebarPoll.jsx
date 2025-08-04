import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SidebarPoll = ({ data, selectedQuestion, setSelectedQuestion }) => {
  const [pollData, setPollData] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8005/poll-by-id/' + data.pollId)
      .then(response => setPollData(response.data.pollData));

    axios.get('http://localhost:8003/getAllQuestions/' + data.pollId)
      .then(res => {
        const fetched = res.data.questions;
        setQuestions(fetched);

        // Jeśli nic nie wybrano, ustaw pierwsze pytanie
        if (!selectedQuestion && fetched.length > 0) {
          fetched[0].number = 1;
          setNumberOfQuestions(fetched.length);
          setSelectedQuestion({
            ...fetched[0],
            number: 1,
            total: fetched.length
          });
        }
      });
  }, [data.pollId]);

  document.title = 'Poll - ' + pollData.name + '| SuffraHub';

  return (
    <>
      <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary" style={{ height: '90vh' }}>
        <div className="bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">

          <h5 className="bg-dark text-light p-2">
            <b>{pollData.name}</b>
          </h5>
        </div>

        <div className="d-flex flex-wrap gap-2 p-2">
          {questions.map((question, index) => (
            <button
              key={index + 1}
              onClick={() => setSelectedQuestion({ ...question, number: index + 1, total: numberOfQuestions })}
              className={`btn text-white ${question.hasAnswer ? 'bg-success' : 'bg-secondary'}`}
              style={{ width: '40px', height: '40px' }}
              title={`Pytanie ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>

  );
};

export default SidebarPoll;
