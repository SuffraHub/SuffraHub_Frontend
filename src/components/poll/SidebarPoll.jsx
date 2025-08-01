import { useState } from 'react';
import axios from 'axios'

const Sidebar = (props) => {
  const activePoll = {
    id: 1,
    name: 'Głosowanie: Budżet 2025',
    questions: [
      { id: 1, hasAnswer: true },
      { id: 2, hasAnswer: false },
      { id: 3, hasAnswer: true },
      { id: 4, hasAnswer: false },
      { id: 5, hasAnswer: true },
      { id: 6, hasAnswer: false },
      { id: 7, hasAnswer: true },
    ]
  };

    const [pollData, setPollData] = useState([]);

    axios.get('http://localhost:8005/poll-by-id/'+props.data.pollId)
    .then(response => setPollData(response.data.pollData));


  return (
    <>
<div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary" style={{ height: '90vh' }}>
      <div className="bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        
          <h5 className="bg-dark text-light p-2">
            <b>{pollData.name}</b>
          </h5>
        </div>

        <div className="d-flex flex-wrap gap-2 p-2">
          {activePoll.questions.map((question) => (
            <button
              key={question.id}
              className={`btn text-white ${question.hasAnswer ? 'bg-success' : 'bg-secondary'}`}
              style={{ width: '40px', height: '40px' }}
              title={`Pytanie ${question.id}`}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
   </>

  );
};

export default Sidebar;
