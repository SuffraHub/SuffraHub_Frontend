

function AdminAccount() {

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h3 d-flex">
                    <ol className="breadcrumb align-self-end">
                        <li className="breadcrumb-item"><a href="/"><svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" fill="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg></a></li>
                        <li className="breadcrumb-item"><a href="/admin.php">Admin panel</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Account</li>
                    </ol>
                </h1>
                {/* <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2 "> <button type="button" className="btn btn-sm btn-outline-secondary">Share</button> <button type="button" className="btn btn-sm btn-outline-secondary">Export</button> </div>
                    <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
                        <svg className="bi" aria-hidden="true">
                            <use xlink:href="#calendar3"></use>
                        </svg>
                        This week
                    </button>
                </div> */}
            </div>
            <div className="card shadow-sm p-4 my-4">
                <h4 className="card-title mb-3">Your profile</h4>
                <h5 className="fst-italic fw-bold">USERNAME</h5>
                <form className="mb-4" action="" method="post">
                    <div className="card-body">
                        <div className="form-floating mb-1">
                            <input type="text" className="form-control" id="imie" name="imie" placeholder="Imię" value="" />
                            <label for="imie">Name</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="nazwisko" name="nazwisko" placeholder="Nazwisko" value="" />
                            <label for="nazwisko">Surname</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="email" className="form-control" id="email" name="email" placeholder="email" value="" />
                            <label for="email">E-mail</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="password" name="password" placeholder="Hasło" />
                            <label for="password">Password</label>
                        </div>
                        <div className="form-floating mb-1">
                            <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Potwierdź hasło" />
                            <label for="confirm_password">Confirm password</label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Confirm changes</button>
                </form>

            </div>

        </>

    )


}

export default AdminAccount