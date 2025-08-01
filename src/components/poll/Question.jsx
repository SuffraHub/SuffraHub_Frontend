import { useState } from "react";
import axios from 'axios';

function Question(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [question, setQuestion] = useState([]);
    const [options, setOptions] = useState([]);

    axios.get('http://localhost:8003/getQuestion/' + props.id)
    .then(res => setQuestion(res.data.questionData));

    axios.get('http://localhost:8003/getOptions/' + props.id)
    .then(res => setOptions(res.data.options));

    return (
        <>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: '71%' }} aria-valuenow="5" aria-valuemin="1" aria-valuemax="7">71%</div>
            </div>
            <h1 className="text-body-emphasis text-start mt-3 h1">
                <div className="d-flex align-items-center">
                    <span className="text-secondary">#</span>
                    <b>5</b>
                    <span className="h3 ms-3 mb-0">{question.question}</span>
                </div>
            </h1>

            <form>
                {options.map((option, i) => {
                    const bg = ["bg-success text-white","bg-danger text-white",""];
                    return (
                        <div
                            className="form-check mb-3 d-flex align-items-center gap-3"
                            key={i}
                        >
                            <input
                                className="form-check-input"
                                type="radio"
                                name="exampleRadios"
                                id={`exampleRadios${i + 1}`}
                                value={option.label}
                                checked={selectedOption === option.label}
                                onChange={() => setSelectedOption(option.label)}
                            />
                            <label
                                className={`form-check-label border rounded p-2 px-4 mb-0 ${bg[i]}`}
                                htmlFor={`exampleRadios${i + 1}`}
                            >
                                {option.label}
                            </label>
                        </div>
                    );
                })}

                <div className="mt-3 text-start">
                    <a
                        href="#"
                        className="text-primary text-decoration-underline d-inline-block"
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedOption(null);
                        }}
                    >
                        Wyczyść wybór
                    </a>
                </div>

            </form>


        </>
    )
}


export default Question;