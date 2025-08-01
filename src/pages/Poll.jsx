import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function PollPage() {
  useEffect(() => {
    document.title = 'Poll <name> | SuffraHub';
  }, []);
    const [selectedOption, setSelectedOption] = useState(null);

  const question_number = 5;
  const pages = ['<-', question_number , '->'];
  const currentPage = question_number;

  return (
    <>
    <div
      className="container d-flex flex-column"
      style={{ minHeight: '80vh' }}
    >
      <div className="row">
        <div class="container my-5">
			<div class="p-5 text-center bg-body-tertiary rounded-3">
        <div className="progress">
  <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: '71%'}} aria-valuenow="5" aria-valuemin="1" aria-valuemax="7">71%</div>
</div>
				<h1 className="text-body-emphasis text-start mt-3 h1">
  <div className="d-flex align-items-center">
    <span className="text-secondary">#</span>
    <b>5</b>
    <span className="h3 ms-3 mb-0">What do you think about some changes in project?</span>
  </div>
</h1>

    <form>
      {["option1", "option2", "option3"].map((option, i) => {
        const labels = { option1: "Yes", option2: "No", option3: "Hold" };
        const bg = {
          option1: "bg-success text-white",
          option2: "bg-danger text-white",
          option3: "",
        };
        return (
          <div
            className="form-check mb-3 d-flex align-items-center gap-3"
            key={option}
          >
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id={`exampleRadios${i + 1}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => setSelectedOption(option)}
            />
            <label
              className={`form-check-label border rounded p-2 px-4 mb-0 ${bg[option]}`}
              htmlFor={`exampleRadios${i + 1}`}
            >
              {labels[option]}
            </label>
          </div>
        );
      })}

<div className="mt-3 text-start">
  <a
    href="#"
    className="text-primary text-decoration-underline d-inline-block"
    onClick={(e) => {
      e.preventDefault();
      setSelectedOption(null);
    }}
  >
    Wyczyść wybór
  </a>
</div>

    </form>


        
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
