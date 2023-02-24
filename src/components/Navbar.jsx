import React, { useState } from "react";

export default function Navbar({setSelectedMode}) {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => {
        setNavbarOpen(prevState => !prevState)
    };

    const handleBtn = (event) => {
        const id = event.target.id;
        setSelectedMode(id);
    }

    return (
        <nav className={navbarOpen ? "navbar navbar--toggled" : "navbar"}>
            <h1>Flashcards Web App</h1>
            <button onClick={toggleNavbar} className="material-symbols-outlined btn">menu</button>
            <ul className="navbar--links">
                <li><button onClick={handleBtn} id="edit" className="btn">Edit</button></li>
                <li><button onClick={handleBtn} id="study" className="btn">Study</button></li>
            </ul>
        </nav>
    );
}
