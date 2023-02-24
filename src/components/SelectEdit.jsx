import React from "react";
import SelectEditTile from "./SelectEditTile";

export default function SelectEdit({setIsEditing, setFlashcardSets, flashcardSets, selectedFlashcardSet, setSelectedFlashcardSet, storeFLashcardSets}) {
    
    // Render editing window.
    const toggleEditing = () => {
        setIsEditing(true);
    };

    // Render tile elements.
    const SelectEditTiles = flashcardSets.map(set => <SelectEditTile
        title={set.setTitle}
        key={set.setId}
        id={set.setId}
        flashcardsArray={set.flashcardsArray}
        toggleEditing={toggleEditing}
        selectedFlashcardSet={selectedFlashcardSet}
        setSelectedFlashcardSet={setSelectedFlashcardSet}
        flashcardSets={flashcardSets}
        setFlashcardSets={setFlashcardSets}
    />)


    // Generate a flashcard set ID.
    const generateSetId = function() {
        let arrayLength = flashcardSets.length;
        let randomNum = Math.floor(Math.random()*100);
        return Number((''+arrayLength+randomNum));
    }

    // Create a flashcard set and push it to an array. User has to select a title that isn't already in use.
    const createFlashcardSet = () => {
        let userTitle = prompt("Select title:");
        let generatedSetId = generateSetId();
        // Check if the name's already in use.
        if (flashcardSets.some(set => set.setTitle == userTitle)){
            alert("This title is already taken. Please select a new one:");
            return createFlashcardSet();
        } else {
            setFlashcardSets(prevSet => [...prevSet, {
                setTitle: userTitle,
                setId: generatedSetId,
                flashcardsArray: [],
            }]);
        };
        storeFLashcardSets();
    };

    return(
        <section className="SelectEdit">
            {SelectEditTiles}
            <div className="SelectEdit--tile SelectEdit--add" onClick={createFlashcardSet}>
                <h3>Add new flashcard set</h3>
            </div>
        </section>
    )
}
