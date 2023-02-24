import React, { useState } from "react";
import SelectEdit from "./SelectEdit";
import SelectStudy from "./SelectStudy";
import EditFlashcards from "./EditFlashcards";
import StudyFlashcards from "./StudyFlashcards";

export default function Main({selectedMode, isEditing, setIsEditing, isStudying, toggleStudying}) {
    const [flashcardSets, setFlashcardSets] = useState(() => {if (localStorage.getItem('flashcardSets') == null) {
        return [];
    } else if (localStorage.getItem('flashcardSets') !== null) {
        const returned = localStorage.getItem('flashcardSets');
        return JSON.parse(returned);
    }});
    const [selectedFlashcardSet, setSelectedFlashcardSet] = useState({setTitle: 'unselected', setId: 'unselected', flashcardsArray: []});

    // Put flashcardSets into local storage.
    const storeFLashcardSets = () => localStorage.setItem('flashcardSets', JSON.stringify(flashcardSets));

    const selectMode = selectedMode==="edit" ?
    <SelectEdit
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        setIsEditing={setIsEditing}
        selectedFlashcardSet={selectedFlashcardSet}
        setSelectedFlashcardSet={setSelectedFlashcardSet}
        storeFLashcardSets={storeFLashcardSets}
    /> :
    <SelectStudy
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
        selectedFlashcardSet={selectedFlashcardSet}
        setSelectedFlashcardSet={setSelectedFlashcardSet}
        toggleStudying={toggleStudying}
    /> 

    return(
        <main className="main">
            {selectMode}
            <EditFlashcards
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                selectedFlashcardSet={selectedFlashcardSet}
                setSelectedFlashcardSet={setSelectedFlashcardSet}
                flashcardSets={flashcardSets}
                setFlashcardSets={setFlashcardSets}
                storeFLashcardSets={storeFLashcardSets}
            />
            <StudyFlashcards
                isStudying={isStudying}
                selectedFlashcardSet={selectedFlashcardSet}
                toggleStudying={toggleStudying}
            />
        </main>
    )
}