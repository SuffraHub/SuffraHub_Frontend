import { Link } from "react-router-dom";

function AdminPolls() {
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h3 d-flex">
                    <ol className="breadcrumb align-self-end">
                        <li className="breadcrumb-item">
                            <Link to="/">
                                <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                                    <path d="..." />
                                </svg>
                            </Link>
                        </li>
                        <li className="breadcrumb-item"><Link to="/admin">Panel administracyjny</Link></li>
                        <li className="breadcrumb-item"><Link to="/admin/tenant">Dzierżawa</Link></li>
                        <li className="breadcrumb-item active">Głosowania</li>
                        <li className="breadcrumb-item active" aria-current="page">Utwórz głosowanie</li>
                    </ol>
                </h1>

                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                        <svg className="bi" aria-hidden="true"><use xlinkHref="#calendar3"></use></svg>
                        This week
                    </button>
                </div> */}
            </div>

            <div className="card shadow-sm p-4 my-4">
                <h4 className="card-title mb-3">Utwórz nowe głosowanie</h4>
                <form className="mb-4" action="" method="post">
                    <div className="card-body">
                        <div className="form-floating mb-2">
                            <input type="text" className="form-control" id="poll_name" name="new_poll" placeholder="Pytanie" />
                            <label htmlFor="poll_name">Nazwa</label>
                        </div>
                        <div className="form-floating mb-3">
                            <textarea className="form-control" placeholder="Opis" id="poll_description" name="new_poll_description" />
                            <label htmlFor="poll_description">Opis</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="datetime-local"
                                className="form-control"
                                id="poll_valid_to"
                                name="new_poll_valid_to"
                                placeholder="Opis"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-html="true"
                                title="Jeśli chcesz, aby głosowanie nie wygasało, ustaw datę wygaśniecia na 00-00-0000"
                            />
                            <label htmlFor="poll_valid_to">
                                Data ważności
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="ms-1 bi bi-info-circle" viewBox="0 0 16 16">
                                    <path d="..." />
                                </svg>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Utwórz głosowanie</button>
                </form>
            </div>
        </>
    );
}

export default AdminPolls;
