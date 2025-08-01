import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function PollPage() {
  useEffect(() => {
    document.title = 'Poll <name> | SuffraHub';
  }, []);

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
  <div className="form-check mb-3 d-flex align-items-center gap-3">
    <input
      className="form-check-input"
      type="radio"
      name="exampleRadios"
      id="exampleRadios1"
      value="option1"
    />
    <label
      className="form-check-label border rounded p-2 px-4 bg-success text-white mb-0"
      htmlFor="exampleRadios1"
    >
      Yes
    </label>
  </div>

  <div className="form-check mb-3 d-flex align-items-center gap-3">
    <input
      className="form-check-input"
      type="radio"
      name="exampleRadios"
      id="exampleRadios2"
      value="option2"
    />
    <label
      className="form-check-label border rounded p-2 px-4 bg-danger text-white mb-0"
      htmlFor="exampleRadios2"
    >
      No
    </label>
  </div>

  <div className="form-check d-flex align-items-center gap-3">
    <input
      className="form-check-input"
      type="radio"
      name="exampleRadios"
      id="exampleRadios3"
      value="option3"
    />
    <label
      className="form-check-label border rounded p-2 px-4 mb-0"
      htmlFor="exampleRadios3"
    >
      Hold
    </label>
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
