import React, { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = ({ toastMessages = [] }) => {
  useEffect(() => {
    const toastElList = document.querySelectorAll('.toast');
    toastElList.forEach((toastEl) => {
      const toast = new window.bootstrap.Toast(toastEl, { autohide: false });
      toast.show();
    });
  }, [toastMessages]);

  return (
    <>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 mb-0 text-body-secondary">
            &copy; <b>2025</b> Stanisław Maik, Mateusz Ostrowski, Damian Pepliński, Amelia Staszczyk, Franciszek Woźniak - <b>Pinguinos</b> in collaboration with <b>mAvent plan</b><br />
            <span className="fw-bold">SuffraHub v.0.1</span>
          </p>

          <a
            href="/"
            className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            aria-label="Bootstrap"
          >
            <i className="bi bi-check2-square" style={{ fontSize: '2rem', color: 'blue' }}></i>
          </a>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
          </ul>
        </footer>
      </div>

      {/* Toasty – na razie placeholderowe */}
      {toastMessages.length > 0 && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2">
          {toastMessages.map((message, index) => (
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" key={index}>
              <div className="toast-header">
                <img src="/img/icon.png" width="16" height="16" className="rounded me-2" alt="..." />
                <strong className="me-auto">Informacja</strong>
                <small>Teraz</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Zamknij"></button>
              </div>
              <div className="toast-body">
                {message}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Footer;
