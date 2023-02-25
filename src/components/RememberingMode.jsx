import React , { useState, useEffect } from "react";

export default function RememberingMode(props) {
    const [answers, setAnswers] = useState({main: [], correct: [], wrong: [], initial: []});
    const [isStudying, setIsStudying] = useState(false);
    const [currentFlashcard, setCurrentFlashcard] = useState({frontSide: "", backSide: "", optional: "", id: ""});
    const [showOptional, setShowOptional] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const [val, setVal] = useState(0); // Counter used for useEffect

     // Every time answers changes set a new currentFlashcard
     useEffect(() => {
        if(answers.main.length > 0) {
            newCurrentFlashcard();
        }
    }, [val]);

    // Store current session progress in local storage
    const storeCurrentSession = function() {
        if ((localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`)) !== null) {
            localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`);
        };
        localStorage.setItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`, JSON.stringify({answers}));
    };

    // Copy of selected flashcard set
    const flashcardsArrayCopy = [...props.selectedFlashcardSet.flashcardsArray];


    // Select a random flashcard from the main array and set it as a current flashcard.
    const newCurrentFlashcard = function() {
        setCurrentFlashcard(answers.main[Math.floor(Math.random()*answers.main.length)]);   
    };

    // Set initial state
    const handleInitialState = function() {
        setAnswers(({
            correct: [],
            wrong: [],
            main: flashcardsArrayCopy,
            initial: props.selectedFlashcardSet.flashcardsArray
            })
        );
        setVal(prev=>prev+1);
    };

    // Start a session
    const startSession = function() {
        setIsStudying(true);
        handleInitialState();
    };

    // Continue session 
    const continueSession = function() {
        let sessionJSON = localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`);
        let sessionParsed = JSON.parse(sessionJSON);
        if ((sessionParsed.answers.main.length == 0)&&(sessionParsed.answers.wrong.length > 0)) {
            sessionParsed.answers.main = sessionParsed.answers.wrong;
        };
        setAnswers(sessionParsed.answers);
        setIsStudying(true);
        setVal(prev => prev+1);
    }

    // Restart current session
    const restartSession = function() {
        setIsStudying(false);
        handleInitialState();
    };

    // Wrong and correct buttons onclick
    const handleAnswer = function(correctness) {
        const currentFlashcardID = currentFlashcard.id;
        const currentFlashcardIndex = answers.main.map(flashcard => flashcard.id).indexOf(currentFlashcardID);
        const mainCopy = answers.main;
        const wrongCopy = answers.wrong;
        const correctCopy = answers.correct;
        setShowOptional(false);
        if (correctness === "correct") {
            // correct
            correctCopy.push(currentFlashcard);
            mainCopy.splice(currentFlashcardIndex, 1);
            setAnswers(prevState => ({
                ...prevState,
                main: mainCopy,
                correct: correctCopy
                })
            );
            storeCurrentSession();
            setVal(prev=>prev+1);
            if ((answers.main.length === 0) && (answers.wrong.length === 0)) {
                // end
                localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`);
                setIsStudying(false);
            } else if (answers.main.length === 0) {
                // next round
                setAnswers(prevState => ({
                    ...prevState,
                    wrong: [],
                    main: wrongCopy
                }));
                storeCurrentSession();
            };
        } else if (correctness === "wrong") {
            // wrong
            wrongCopy.push(currentFlashcard);
            mainCopy.splice(currentFlashcardIndex, 1);
            setAnswers(prevState => ({
                ...prevState,
                main: mainCopy,
                wrong: wrongCopy
                })
            );
            storeCurrentSession();
            setVal(prev=>prev+1);
            if (answers.main.length === 0) {
                // next round
                setAnswers(prevState => ({
                    ...prevState,
                    wrong: [],
                    main: wrongCopy
                }));
                storeCurrentSession();
            };
        }
    };

    // Toggle optional text
    const toggleOptional = function() {
        setShowOptional(prev=>!prev);
    };

    // Flip the flashcard
    const toggleFlip = function() {
        setIsFlipped(prev => !prev);
    };

    return(
        <section className={(props.currentMode === "remembering") ? "StudyingMode" : "HiddenMode"}>
            <div className="StudyingMode--hero">
                <h1 className="hero--title">{props.selectedFlashcardSet.setTitle}</h1>
                <div className="hero--buttons">
                    <button onClick={props.toggleModeOff} className="btn">Back</button>
                    {isStudying && <button onClick={restartSession} className="btn">Restart</button>}
                </div>
            </div>
            {!isStudying && <button onClick={startSession} className="StudyingMode--start">Start</button>}
            {(!isStudying && (localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}remembering`) !== null)) && <button onClick={continueSession} className="StudyingMode--start">Continue</button>}
            {isStudying && 
            <div className="StudyingMode--flashcard">
                <div className="flashcard--text" onClick={toggleFlip}>
                    {!isFlipped && <h3>{currentFlashcard.frontSide}</h3>}
                    {isFlipped && <h3>{currentFlashcard.backSide}</h3>}
                </div>
                <div className="flashcard--buttons">
                    <button onClick={() => handleAnswer("wrong")} id="wrong">Wrong</button>
                    <button onClick={() => handleAnswer("correct")} id="correct">Correct</button>
                </div>
                {currentFlashcard.optional && <button onClick={toggleOptional} className="btn">Show optional text</button>}
                {showOptional && <p className="flashcard--status">{currentFlashcard.optional}</p>}
                <p className="flashcard--status">{answers.correct.length}/{answers.initial.length}</p>
            </div>}
        </section>
    )
} 