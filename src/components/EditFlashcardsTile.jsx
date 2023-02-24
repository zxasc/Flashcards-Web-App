import React from "react";

export default function EditFlashcardsTile(props) {
    const handleDeleting = () => props.deleteFlashcard(props.id);
    const handleEditing = () => props.editFlashcard(props.id);

    return(
        <div className="EditFlashcards--tile">
            <div>
                <h3>Front:</h3>
                <textarea defaultValue={props.frontSide} onChange={handleEditing} id="frontSide" className="EditFlashcards--tile-textarea"></textarea>
            </div>
            <div>
                <h3>Back:</h3>
                <textarea defaultValue={props.backSide} onChange={handleEditing} id="backSide" className="EditFlashcards--tile-textarea"></textarea>
            </div>
            <div>
                <h3>Optional:</h3>
                <textarea defaultValue={props.optional} onChange={handleEditing} id="optionalSide" className="EditFlashcards--tile-textarea"></textarea>
            </div>
            <br />
            <button onClick={handleDeleting} className="btn">Delete</button>
        </div>
    )
}