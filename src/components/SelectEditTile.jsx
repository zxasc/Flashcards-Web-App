import React from "react";

export default function SelectEditTile(props) { 

    // Select current flashcard set.
    const selectCurrentFlashcardSet = function() {
        const foundSet = props.flashcardSets.find(set => set.setId === props.id);
        props.setSelectedFlashcardSet(foundSet);
    }

    // Delete current flashcard set.
    const handleDelete = function() {
        localStorage.removeItem(`${props.selectedFlashcardSet.setTitle}${props.selectedFlashcardSet.setId}`);
        let newSet = props.flashcardSets.filter(set => set !== props.selectedFlashcardSet);
        props.setFlashcardSets(newSet);
    };


    // Toggle editing.
    const handleEditing = function() {
        props.toggleEditing();   
    };

    return(
        <div className="SelectEdit--tile" onClick={selectCurrentFlashcardSet}>
            <h1 className="SelectEdit--title">{props.title}</h1>
            {/* Ternary for deciding whether to show edit and delete buttons */}
            <div className={(props.selectedFlashcardSet.setId === props.id) ? "SelectEdit--buttons Selected" : "SelectEdit--buttons"}>
                <button onClick={handleEditing} className="edit--btn btn">Edit</button>
                <button onClick={handleDelete} className="delete--btn btn">Delete</button>
            </div>
        </div>
    )
}