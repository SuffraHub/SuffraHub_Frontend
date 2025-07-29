 import { Link } from "react-router-dom";

function AdminQuestion() {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h3 d-flex">
          <ol className="breadcrumb align-self-end">
            <li className="breadcrumb-item">
              <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumb-item"><Link to="/admin">Panel administracyjny</Link></li>
            <li className="breadcrumb-item"><Link to="/admin_tenant">Dzierżawa</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Baza pytań</li>
          </ol>
        </h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
            <svg className="bi" aria-hidden="true"><use xlinkHref="#calendar3"></use></svg>
            This week
          </button>
        </div>
      </div>

      <div className="card shadow-sm p-4 my-4">
        <h5>Pytania</h5>
        <h4 className="card-title mb-3">Utwórz nowe pytanie</h4>
        <form className="mb-4" action="" method="post">
          <div className="card-body">
            <div className="form-floating mb-2">
              <input type="text" className="form-control" id="question_name" name="new_question" placeholder="Pytanie" />
              <label htmlFor="question_name">Pytanie</label>
            </div>
            <div className="form-floating mb-3">
              <textarea className="form-control" placeholder="Opis" id="question_description" name="new_question_description"></textarea>
              <label htmlFor="question_description">Opis</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success">Utwórz pytanie</button>
        </form>
      </div>

      <h5>Pytania w dzierżawie</h5>
      <div className="card-body">
        <div className="overflow-x-auto" style={{ maxWidth: "100%" }}>
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Pytanie</th>
                <th scope="col">Opis</th>
                <th scope="col">Ukryte</th>
                <th scope="col">Data utworzenia</th>
                <th scope="col">Utworzone przez</th>
                <th scope="col">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {/* Populate with dynamic data later */}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default AdminQuestion;
