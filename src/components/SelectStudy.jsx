import React from "react";
import SelectStudyTile from "./SelectStudyTile";

export default function SelectStudy(props) {

    // Select current flashcard set.
    const selectCurrentFlashcardSet = function(id) {
        const foundSet = props.flashcardSets.find(set => set.setId === id);
        props.setSelectedFlashcardSet(foundSet);
    }

    // Render a SelectStudyTile for every flashcard set.
    const SelectStudyTiles = props.flashcardSets.map(set => <SelectStudyTile
        title={set.setTitle}
        key={set.setId}
        id={set.setId}
        flashcardsArray={set.flashcardsArray}
        selectCurrentFlashcardSet={selectCurrentFlashcardSet}
        toggleStudying={props.toggleStudying}
    />)

    return (
        <section className="SelectStudy">
            {SelectStudyTiles}

        </section>
    )
}