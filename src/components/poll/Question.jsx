import { useEffect, useState } from "react";
import axios from 'axios';

function Question(props) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [question, setQuestion] = useState([]);
    const [options, setOptions] = useState([]);


    const handleChange = (label) => {
        setSelectedOption(label);

        const selected = props.data.options.find(opt => opt.label === label);


        const answerData = {
            question_poll_id: props.data.question_id,
            question: props.data.question,
            option_id: selected.option_id,
            answer: selected.label
        };

        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};

        savedAnswers[props.data.number] = answerData;

        localStorage.setItem("answers", JSON.stringify(savedAnswers));
    }

    useEffect(() => {
        const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
        const saved = savedAnswers[props.data.number];
        if (saved) {
            setSelectedOption(saved.answer);
        } else {
            setSelectedOption(null);
        }
    }, [props.data.question_id]);

    console.log("Props:", props);

    return (
        <>
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${(props.data.number / props.data.total) * 100}%` }} aria-valuenow="5" aria-valuemin="1" aria-valuemax="7">{Math.round((props.data.number / props.data.total) * 100)}%</div>
            </div>
            <h1 className="text-body-emphasis text-start mt-3 h1">
                <div className="d-flex align-items-center">
                    <span className="text-secondary">#</span>
                    <b>{props.data.number}</b>
                    <span className="h3 ms-3 mb-0">{props.data.question}</span>
                </div>
            </h1>

            <form>
                {props.data.options.map((option, i) => {
                    const bg = ["bg-success text-white", "bg-danger text-white", ""];
                    return (
                        <div
                            className="form-check mb-3 d-flex align-items-center gap-3"
                            key={i}
                        >
                            <input
                                className="form-check-input"
                                type="radio"
                                name={`question-${props.data.number}`} // ← UNIKALNA NAZWA
                                id={`exampleRadios-${props.data.number}-${i + 1}`}
                                value={option.label}
                                checked={selectedOption === option.label}
                                onChange={() => handleChange(option.label)}
                            />
                            <label
                                className={`form-check-label border rounded p-2 px-4 mb-0 ${bg[i]}`}
                                htmlFor={`exampleRadios-${props.data.number}-${i + 1}`}
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