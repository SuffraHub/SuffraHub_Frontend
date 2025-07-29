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
    <div
      className="container d-flex flex-column"
      style={{ minHeight: '100vh' }}
    >
      <div className="row">
        <h1 className="text-warning fw-bold">
          Tu będą rzeczy. To jest strona głosowanie
        </h1>
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
  );
}

export default PollPage;
