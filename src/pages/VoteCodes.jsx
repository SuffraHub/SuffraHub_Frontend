import { useState } from 'react';
import { Link } from 'react-router-dom';

const VoteCodes = () => {
  const [codeCount, setCodeCount] = useState(10);

  return (
    <>
            <div className="card shadow-sm p-4 my-4">
        <h5 className="card-title mb-3">Poll codes generating</h5>
        <form
          action="/generate_codes.php" // Placeholder, backend nieobsługiwany
          method="post"
          target="pdfFrame"
        >
          <div className="mb-3">
            <label htmlFor="code_count" className="form-label">Number of codes to generate</label>
            <input
              type="number"
              className="form-control"
              id="code_count"
              name="code_count"
              min="1"
              max="1000"
              value={codeCount}
              onChange={(e) => setCodeCount(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Generate PDF</button>
        </form>
      </div>

      <iframe id="pdfFrame" name="pdfFrame" style={{ width: '100%', height: '100vh', border: 'none' }} title="PDF Preview" />

      <h2 className="mt-5">Section title</h2>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }, (_, i) => (
              <tr key={i}>
                <td>{1001 + i}</td>
                <td>placeholder</td>
                <td>data</td>
                <td>example</td>
                <td>row</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VoteCodes;
