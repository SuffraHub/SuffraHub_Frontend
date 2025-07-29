import { useState } from 'react';
import { Link } from 'react-router-dom';

const EditQuestion = () => {
  const [question, setQuestion] = useState('Jakie jest twoje ulubione miasto?');
  const [description, setDescription] = useState('Opis przykładowego pytania.');
  const [hidden, setHidden] = useState(false);

  return (
    <div className="pt-3 pb-2 mb-3 border-bottom">
     

      <div className="card shadow-sm p-4 my-4">
        <h5>Pytania</h5>
        <h4 className="card-title mb-3">Edycja pytania</h4>
        <form className="mb-4">
          <div className="card-body">
            <input type="hidden" name="question_id" value="1" />
            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                id="question_name"
                name="new_question"
                placeholder="Pytanie"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <label htmlFor="question_name">Pytanie</label>
            </div>
            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                placeholder="Opis"
                id="question_description"
                name="new_question_description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="question_description">Opis</label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="hidden"
                checked={hidden}
                onChange={() => setHidden(!hidden)}
              />
              <label className="form-check-label" htmlFor="hidden">
                Ukryte
              </label>
            </div>

            <div className="form-floating mb-2">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="created_at"
                name="created_at"
                placeholder="Utworzono"
                value="2025-07-01 10:30:00"
              />
              <label htmlFor="created_at">Data utworzenia</label>
            </div>
            <div className="form-floating mb-2">
              <input
                type="text"
                readOnly
                className="form-control-plaintext"
                id="created_by"
                name="created_by"
                placeholder="Utworzono przez"
                value="Jan Kowalski (jankowal)"
              />
              <label htmlFor="created_by">Utworzone przez</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success">Zapisz zmiany</button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
