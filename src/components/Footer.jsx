import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <footer className="py-3 my-4 border-top">
          <div className="row align-items-center">
            {/* Lewa kolumna */}
            <div className="col-md-5 text-body-secondary text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0">
                &copy; <b>2025</b> Stanisław Maik, Mateusz Ostrowski, Damian Pepliński, Amelia Staszczyk, Franciszek Woźniak
                – <b>Pinguinos</b><br /> in collaboration with <b>mAvent plan</b>
              </p>
            </div>

            {/* Środkowa kolumna */}
            <div className="col-md-2 text-center mb-3 mb-md-0">
              <a
                href="/"
                className="d-flex align-items-center justify-content-center link-body-emphasis text-decoration-none mb-1"
                aria-label="SuffraHub | Home"
              >
                <i className="bi bi-check2-square" style={{ fontSize: '2rem', color: 'blue' }}></i>
              </a>
              <p className="mb-0"><strong>SuffraHub</strong> v.<strong>1</strong>.0</p>
              <p>(<Link to="https://github.com/SuffraHub/SuffraHub_Frontend/releases">changelog</Link>)</p>
            </div>

            {/* Prawa kolumna */}
            <div className="col-md-5">
              <ul className="nav justify-content-center justify-content-md-end">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-body-secondary">About</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </div>

      {/* Toasty */}
      {toastMessages.length > 0 && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3 d-flex flex-column gap-2">
          {toastMessages.map((message, index) => (
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false" key={index}>
              <div className="toast-header">
                <img src="/img/icon.png" width="16" height="16" className="rounded me-2" alt="..." />
                <strong className="me-auto">Informacja</strong>
                <small>Now</small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
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
