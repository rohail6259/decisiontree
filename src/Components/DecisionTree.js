import React, { useState } from "react";

function DecisionTree() {
    const [name, setName] = useState("");
    const [activateQuestions, setActivateQuestions] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [ticketRecommendation, setTicketRecommendation] = useState("");

    const questions = [
        {
            question: "Which place you are going to visit?",
            answers: ["museum", "zoo"],
            nextIndex: [1, 2],
        },
        {
            question: "which museum you want to visit?",
            answers: ["east museum", "west museum"],
            nextIndex: [3],
        },
        {
            question: "which zoo you want to visit?",
            answers: ["east zoo", "west zoo"],
            nextIndex: [4],
        },
        {
            question: "how long are you planning to stay in museum?",
            answers: ["1 hour", "2 hour", "more than 2 hours"],
            bvg: [
                { ticket: "BVG 1 or BVG 2" },
                { ticket: "BVG 1 or BVG 2" },
                { ticket: "BVG 5" },
            ],
        },
        {
            question: "how long are you planning to stay in zoo?",
            answers: ["1 hour", "2 hour"],
            bvg: [{ ticket: "BVG 3" }, { ticket: "BVG 7" }],
        },
    ];

    const onClickAnswerInputField = (e) => {
        let currentElem = e.currentTarget;
        setTimeout(() => {
            currentElem.checked = false;
            if (questions[questionIndex].hasOwnProperty("bvg"))
                setTicketRecommendation(questions[questionIndex].bvg);
            else setQuestionIndex(currentElem.dataset.nextindex);
        }, 100);
    };

    const nextIndexFinder = (questionIndex, idx) => {
        if (questions[questionIndex].hasOwnProperty("nextIndex")) {
            return questions[questionIndex].nextIndex.length > 1
                ? questions[questionIndex].nextIndex[idx]
                : questions[questionIndex].nextIndex[0];
        } else return "";
    };

    const onClickCheckAgain = () => {
        setName("");
        setActivateQuestions(false);
        setQuestionIndex(0);
        setTicketRecommendation("");
    };

    return (
        <section>
            <div className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="row">
                    {!activateQuestions && (
                        <div className="col-12 text-center">
                            <h4>What is your name?</h4>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                            <button onClick={() => setActivateQuestions(true)}>
                                Submit
                            </button>
                        </div>
                    )}
                    {activateQuestions && (
                        <div className="col-12 text-center">
                            <h4>
                                {ticketRecommendation
                                    ? `Hi ${name.replace(/\b\w/g, (x) =>
                                          x.toUpperCase()
                                      )}, Please purchase this recommended ticket: `
                                    : questions[questionIndex].question}
                            </h4>
                            {!ticketRecommendation ? (
                                questions[questionIndex].answers.map(
                                    (answer, idx) => (
                                        <div key={`question-${idx}`} className="text-left">
                                            <input
                                                className="mr-2"
                                                type="radio"
                                                data-nextindex={nextIndexFinder(
                                                    questionIndex,
                                                    idx
                                                )}
                                                value={answer}
                                                onClick={(e) => {
                                                    localStorage.setItem(
                                                        "answerIndex",
                                                        idx
                                                    );
                                                    onClickAnswerInputField(e);
                                                }}
                                            />
                                            <label className="mr-3">
                                                {answer}
                                            </label>
                                        </div>
                                    )
                                )
                            ) : (
                                <>
                                    <h1>
                                        {
                                            ticketRecommendation[
                                                parseInt(
                                                    localStorage.getItem(
                                                        "answerIndex"
                                                    )
                                                )
                                            ].ticket
                                        }
                                    </h1>
                                    <button onClick={onClickCheckAgain}>
                                        Check Again
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default DecisionTree;
