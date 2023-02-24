import React, { useRef, useState } from "react";
import EditFlashcardsTile from "./EditFlashcardsTile";

export default function EditFlashcards(props) {
    // State used to force rerender after adding a new flashcard.
    const [value, setValue] = useState(0);

    // Delete a flashcard.
    const deleteFlashcard = (id) => {
        const selectedSetCopy = props.selectedFlashcardSet;
        const clickedFlashcard = selectedSetCopy.flashcardsArray.find(card => card.id === id);
        const clickedFlashcardIndex = selectedSetCopy.flashcardsArray.indexOf(clickedFlashcard);
        selectedSetCopy.flashcardsArray.splice(clickedFlashcardIndex, 1);
        props.setSelectedFlashcardSet(selectedSetCopy);
        updateFlashcardSets();
        props.storeFLashcardSets();
        setValue(value=>value+1);
    };

    // Edit flashcards side.
    const editFlashcard = (id) => {
        const currentSide = event.target.id
        const selectedSetCopy = props.selectedFlashcardSet;
        const clickedFlashcard = selectedSetCopy.flashcardsArray.find(card => card.id === id);
        const clickedFlashcardIndex = selectedSetCopy.flashcardsArray.indexOf(clickedFlashcard);
        clickedFlashcard[currentSide] = event.target.value;
        selectedSetCopy.flashcardsArray.splice(clickedFlashcardIndex, 1, clickedFlashcard);
        updateFlashcardSets();
        props.storeFLashcardSets();
        setValue(value=>value+1);
    }

    // Render flashcards of current set
    const flashcards = props.selectedFlashcardSet.flashcardsArray.map(card => <EditFlashcardsTile
        frontSide={card.frontSide}
        backSide={card.backSide}
        optional={card.optional}
        key={card.id}
        id={card.id}
        deleteFlashcard={deleteFlashcard}
        editFlashcard={editFlashcard}
    />);

    // Refs for managing textareas values.
    const frontRef = useRef(null);
    const backRef = useRef(null);
    const optionalRef = useRef(null);

    // Generate flashcard ID
    const generateCardId = function() {
        let randomNum = Math.floor(Math.random()*100);
        return Number((''+value+randomNum));
    }

    // Add new flashcard to a set.
    const createFlashcard = () => {
       const selectedSetCopy = props.selectedFlashcardSet;
       selectedSetCopy.flashcardsArray.push({
            frontSide: frontRef.current.value,
            backSide: backRef.current.value,
            optional: optionalRef.current.value,
            id: generateCardId()
       });
       props.setSelectedFlashcardSet(selectedSetCopy);
       updateFlashcardSets();
       front.value = '';
       back.value = '';
       optional.value = '';
       setValue(value=>value+1); 
    };

    

    // Update array of all flashcard sets.
    const updateFlashcardSets = () => {
        const oldSet = props.flashcardSets.find(set => set.setId === props.selectedFlashcardSet.setId);
        const oldSetIndex = props.flashcardSets.indexOf(oldSet);
        const flashcardSetsCopy = props.flashcardSets;
        flashcardSetsCopy[oldSetIndex] = props.selectedFlashcardSet;
        props.setFlashcardSets(flashcardSetsCopy);
    }

    // Toggle editing off
    const toggleEdit = () => {
        props.setIsEditing(false);
        props.storeFLashcardSets();
        setValue(value=>value+1); 
    };

    return(
        <section className={props.isEditing ? "EditFlashcards EditFlashcards--show" : "EditFlashcards disabled"}>
            <header className="EditFlashcards--header">
                <h2>{props.selectedFlashcardSet.setTitle}</h2>
                <button onClick={toggleEdit} className="btn">Back</button>
            </header>
            <div className="EditFlashcards--add-new">
                <div className="EditFlashcards--tileset">
                    {flashcards}
                <div className="EditFlashcards--form">
                    <textarea className="EditFlashcards--textarea" placeholder="Front-side text" ref={frontRef} id="front"  />
                    <textarea className="EditFlashcards--textarea" placeholder="Back-side text" ref={backRef} id="back"  />
                    <textarea className="EditFlashcards--textarea" placeholder="Optional text" ref={optionalRef} id="optional" />
                    <button onClick={createFlashcard} className="btn">Add new flashcard</button>
                </div>  
                </div>
            </div>
        </section>
    )
}