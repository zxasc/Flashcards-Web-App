import React, { useState } from "react";
import TypingMode from "./TypingMode";
import RememberingMode from "./RememberingMode";

export default function StudyFlashcards(props) {
    const [currentMode, setCurrentMode] = useState(null);

    // Turn on pisanie mode
    const toggleTypingMode = function() {
        setCurrentMode("typing");
    };

    // Turn on zapamiętywanie mode
    const toggleRememberingMode = function() {
        setCurrentMode("remembering");
    };

    // Turn off studying mode
    const toggleModeOff = function() {
        setCurrentMode(null);
    };

    return(
        <section className={props.isStudying ? "StudyFlashcards StudyFlashcards--show" : "StudyFlashcards disabled"}>
            <header className="StudyFlashcards--header">
                <h1>{props.selectedFlashcardSet.setTitle}</h1>
                <button onClick={props.toggleStudying} className="btn">Back</button>
            </header>
            <main className="StudyFlashcards--main">
                <h2>Studying method:</h2>
                <button onClick={toggleTypingMode} className="btn">Typing</button>
                <br />
                <button onClick={toggleRememberingMode} className="btn">Remembering</button>
            </main>

            {(currentMode === "typing") && <TypingMode
                currentMode={currentMode}
                toggleModeOff={toggleModeOff}
                selectedFlashcardSet={props.selectedFlashcardSet}
            />}

            {(currentMode === "remembering") && <RememberingMode
                currentMode={currentMode}
                toggleModeOff={toggleModeOff}
                selectedFlashcardSet={props.selectedFlashcardSet}
            />}

        </section>
    )
}