import React from "react";

export default function SelectStudyTile(props) {

    // Select current set and toggle studying mode on.
    const handleToggling = () => {
        props.selectCurrentFlashcardSet(props.id);
        props.toggleStudying();
    }
    
    return(
        <div className="SelectStudy--tile">
            <h1>{props.title}</h1>
            <button className="SelectStudy--button btn" onClick={handleToggling}>Study</button>
        </div>
    )
}