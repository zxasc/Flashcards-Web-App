import React, { useState, useEffect, useRef } from "react";

export default function TypingMode(props) {
    const [answers, setAnswers] = useState({main: [], correct: [], wrong: []});
    const [isStudying, setIsStudying] = useState(false);
    const [currentFlashcard, setCurrentFlashcard] = useState({frontSide: "", backSide: "", optional: "", id: ""});
    const [showOptional, setShowOptional] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [val, setVal] = useState(0) // Counter used for useEffect

    // Every time answers changes set a new currentFlashcard
    useEffect(() => {
        if(answers.main.length > 0) {
            newCurrentFlashcard();
        };
    }, [val]);

    // Store current session progress in local storage
    const storeCurrentSession = function() {
        if ((localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`)) !== null) {
            localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`);
        };
        localStorage.setItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`, JSON.stringify({answers}));
    };

    // Toggling the mode off
    const handleBack = function() {
        if(isStudying === true) {
            storeCurrentSession();
        };
        props.toggleModeOff();
    };

    // Ref for the textarea
    const userAnswerRef = useRef("");

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
        let sessionJSON = localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`);
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
    }

    // Submit an answer
    const submitAnswer = function() {
        const userAnswer = userAnswerRef.current.value;
        const currentFlashcardID = currentFlashcard.id;
        const currentFlashcardIndex = answers.main.map(flashcard => flashcard.id).indexOf(currentFlashcardID);
        const mainCopy = answers.main;
        const wrongCopy = answers.wrong;
        const correctCopy = answers.correct;
        setShowOptional(false); // Hide optional text on next flashcard
        setShowAnswer(false);
        console.log(mainCopy)
        console.log(wrongCopy)
        console.log(correctCopy)
        // Really long if else chain. Basically it puts the current flashcard into either wrong or correct array after submiting an answer. When the main array is empty, it takes all flashcards from the wrong array and puts it into main. This process continues until user has gotten every single flashcard correct.
        if ((mainCopy.length === 0) && (wrongCopy.length === 0)) {
            // end
            localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`);
            setIsStudying(false);
        } else if (mainCopy.length > 0) {
            if(userAnswer == currentFlashcard.backSide.trim()) {
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
                            localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`);
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
                    } else {
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
                            //next round
                            setAnswers(prevState => ({
                                ...prevState,
                                wrong: [],
                                main: wrongCopy
                            }));
                            storeCurrentSession();
                        };    
                    };
        };
        answerInput.value = '';
    };

    // Toggle optional text
    const toggleOptional = function() {
        setShowOptional(prev=>!prev);
    };

    // Toggle answer
    const toggleAnswer = function() {
        setShowAnswer(prev => !prev)
    }

    return(
        <section className={(props.currentMode === "typing") ? "StudyingMode" : "HiddenMode"}>
            <div className="StudyingMode--hero">
                <h1 className="hero--title">{props.selectedFlashcardSet.setTitle}</h1>
                <div className="hero--buttons">
                    <button onClick={handleBack} className="btn">Back</button>
                    {isStudying && <button onClick={restartSession} className="btn">Restart</button>}
                </div>
            </div>
            {!isStudying && <button onClick={startSession} className="StudyingMode--start">Start</button>}
            {(!isStudying && (localStorage.getItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}typing`) !== null)) && <button onClick={continueSession} className="StudyingMode--start">Continue</button>}
            {isStudying && <div className="StudyingMode--flashcard">
                <h3>{currentFlashcard.frontSide}</h3>
                <button onClick={toggleAnswer} className="btn">Show answer</button>
                {showAnswer && <p className="flashcard--status">{currentFlashcard.backSide}</p>}
                <textarea name="answerInput" id="answerInput" cols="20" rows="5" ref={userAnswerRef}></textarea>
                <button onClick={submitAnswer} className="btn">Submit</button>
                {currentFlashcard.optional && <button onClick={toggleOptional} className="btn">Show optional text</button>}
                {showOptional && <p className="flashcard--status">{currentFlashcard.optional}</p>}
                <p className="flashcard--status">{answers.correct.length}/{answers.initial.length}</p>
            </div>}
        </section>
    )
}