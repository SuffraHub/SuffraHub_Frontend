import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Question from '../components/poll/Question';
import axios from 'axios';

function PollPage(props) {
  useEffect(() => {
    document.title = 'Poll <name> | SuffraHub';
  }, []);

  const question_number = 5;
  const pages = ['<-', question_number , '->'];
  const currentPage = question_number;

  const { pollData, selectedQuestion } = useOutletContext();

  if (!selectedQuestion) {
    return <p>Wybierz pytanie z panelu bocznego.</p>;
  }

  return (
    <>
    <div
      className="container d-flex flex-column"
      style={{ minHeight: '80vh' }}
    >
      <div className="row">
        <div class="container my-5">
			<div class="p-5 text-center bg-body-tertiary rounded-3">


    <Question data={selectedQuestion}></Question>


        
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

      <div className="row mt-auto">
        <nav aria-label="..." className="d-flex justify-content-center">
          <ul className="pagination pagination-lg">
            {pages.map((page) => (
              <li
                key={page}
                className={`page-item ${page === currentPage ? 'active' : ''}`}
              >
                <Link className="page-link" to={`/page/${page}`}>
                  {page}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
    </>
  );
}

export default PollPage;
