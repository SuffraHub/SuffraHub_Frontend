import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axiosWithLogger';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CommitteeForm() {
  const [members, setMembers] = useState([]);

  const addMember = () => {
    setMembers([...members, '']);
  };

  const handleNameChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  return (
    <div className="mb-4">
      <button type="button" className="btn btn-primary mb-3" onClick={addMember}>
        Add committee member
      </button>

      <div className="row">
        {members.map((name, idx) => (
          <div key={idx} className="col-12 col-md-3 mb-4 border-start border-end">
            <input
              type="text"
              className="form-control"
              placeholder="Member name"
              value={name}
              onChange={e => handleNameChange(idx, e.target.value)}
            />
            <div style={{ height: 60 }} /> {/* miejsce na podpis na wydruku */}
          </div>
        ))}
      </div>
    </div>
  );
}

function PollReport() {
  const { poll_id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  useEffect(() => {
    document.title = 'Poll Report | SuffraHub';

    const fetchReport = async () => {
      try {
        const userRes = await axios.get('http://localhost:8000/user-info', { withCredentials: true });
        const company_id = userRes.data.company_id;

        const reportRes = await axios.get(`http://localhost:8005/poll-report/${poll_id}/${company_id}`);
        setReport(reportRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load report.');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [poll_id]);

  const exportToPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`poll-report-${report.poll.name}.pdf`);
    });
  };

  if (loading) return <div className="container mt-5">Loading report...</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;
  if (!report) return null;

  return (
    <div className="container mt-4" ref={reportRef}>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Poll Report</h2>
        <button className="btn btn-outline-primary" onClick={exportToPDF}>
          Export to PDF
        </button>
      </div>

      <hr />

      <div className="mb-4">
        <h4>{report.poll.name}</h4>
        <p className="text-muted">{report.poll.description}</p>
        <p><strong>Valid until:</strong> {new Date(report.poll.valid_to).toLocaleDateString()}</p>
        <p><strong>Status:</strong> <span className="text-success">Closed</span></p>
        <p><strong>Voting Type:</strong> Anonymous</p>
      </div>

      {report.questions.length === 0 ? (
        <p className="text-warning">No questions available for this poll.</p>
      ) : (
        report.questions.map((q, index) => (
          <div key={index} className="mb-4">
            <h5>{index + 1}. {q.question}</h5>
            <ul className="list-group">
              {q.results.map((option, idx) => (
                <li
                  key={idx}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{option.label}</span>
                  <span>
                    {option.count} vote(s) ({option.percentage}%)
                  </span>
                </li>
              ))}
            </ul>
            <small className="text-muted mt-1 d-block">Total votes: {q.totalVotes}</small>
          </div>
        ))
      )}

      <hr />

      <CommitteeForm />

      <hr />

      <p className="text-secondary">
        This report was generated automatically. Voting was anonymous. No personal data is included.
      </p>
    </div>
  );
}

export default PollReport;
