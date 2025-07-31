import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Home() {
  const [voteToken, setVoteToken] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [publicVotes, setPublicVotes] = useState([]);

  useEffect(() => {
    document.title = 'Vote | SuffraHub';

    // Załaduj listę głosowań publicznych (tymczasowe dane)
    setPublicVotes([
      {
        id: 1,
        title: 'List group item heading',
        description: 'Some placeholder content in a paragraph.',
        author: 'User1',
      },
      {
        id: 2,
        title: 'Another title here',
        description: 'Content that wraps to a new line.',
        author: 'Manager',
      },
      {
        id: 3,
        title: 'Third heading',
        description: 'Some placeholder content in a paragraph.',
        author: '-',
      },
    ]);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!voteToken || voteToken.length !== 6) {
      setStatusMessage('❌ Enter a valid 6-digits code');
      return;
    }

    const turnstileToken = document.querySelector('[name="cf-turnstile-response"]')?.value;

    const res = await fetch('/api/verify-vote-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vote_token: voteToken,
        cf_turnstile_response: turnstileToken,
      }),
    });

    const data = await res.json();
    if (data.success) {
      setStatusMessage('✅ Token accepted. Redirecting...');
      setTimeout(() => {
        window.location.href = '/vote.php'; // lub zmień na React route
      }, 1000);
    } else {
      setStatusMessage(`❌ ${data.message || 'Invalid token or verification failed.'}`);
    }
  };

  return (
    <>
      <main className="container my-5 py-5 text-center">
          <div className="row align-items-center">
          <div className="col">
            <h1 className="text-body-emphasis"><b>Public</b> polls</h1>
            <div className="list-group mt-4 text-start">
              {publicVotes.map((vote) => (
                <a key={vote.id} href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16" color="blue">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                  </svg>
                  <div className="d-flex gap-2 w-100 justify-content-between">
                    <div>
                      <h6 className="mb-0">{vote.title}</h6>
                      <p className="mb-0 opacity-75">{vote.description}</p>
                    </div>
                    <small className="opacity-50 text-nowrap">{vote.author}</small>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="col border-start border-end">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="blue" className="bi bi-check2-square mb-3" viewBox="0 0 16 16">
                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
              </svg>
              <h1 className="text-body-emphasis"><b>Suffra</b>Hub</h1>
              <p className="col-lg-8 mx-auto fs-5 text-muted">
                System allowing anonymous voting using codes. No logging in, stats provided.
              </p>
                <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group input-group-lg">
                  <div className="form-floating flex-grow-1">
                    <input
                      type="text"
                      className="form-control fw-bold"
                      id="vote_token"
                      placeholder="123456"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={voteToken}
                      onChange={(e) => setVoteToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    />
                    <label htmlFor="vote_token">Poll code</label>
                  </div>
                  <button className="btn btn-outline-primary" type="submit">Vote</button>
                </div>
                <div className="cf-turnstile mt-3" data-sitekey="0x4AAAAAABhPRId8qpQGga-A" data-theme="light"></div>
              </form>

              {statusMessage && <p className="mt-2">{statusMessage}</p>}

              
          </div>
          <div className="col">
            <div className="container">
              <h3 className="fw-bold">
                Contributors
              </h3>
              Stanisław Maik, Mateusz Ostrowski, Damian Pepliński, Amelia Staszczyk, Franciszek Woźniak
            </div>
            <div className="container my-3">
              <img src="https://www.sci.edu.pl/sites/all/themes/sci/gfx/logo100.png" alt="SCI_LOGO" />
            </div>

              <hr />

            <div className="container d-flex flex-column align-items-center text-center">
  <h3 className="fw-bold">Contact</h3>
  <p className="d-flex align-items-center fs-5">
    <i className="bi bi-envelope me-2 fs-4"></i>
    <a href="mailto:contact@suffrahub.com" className="text-decoration-none">
      contact@suffrahub.com
    </a>
  </p>
</div>

          </div>
        </div>
      </main>

      {/* <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script> */}
    </>
  );
}

export default Home;
