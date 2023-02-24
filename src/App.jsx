import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import Navbar from './components/Navbar';
import Main from './components/Main';

function App() {
  const [selectedMode, setSelectedMode] = useState("edit");
  const [isEditing, setIsEditing] = useState(false);
  const [isStudying, setIsStudying] = useState(false);

  const toggleStudying = () => {
    setIsStudying(prev => !prev);
  }

  const toggleEditing = () => {
    setIsEditing(true);
  }

  return (
    <>
      <Navbar
        setSelectedMode={setSelectedMode}
      />
      <Main
        selectedMode={selectedMode}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        toggleEditing={toggleEditing}
        isStudying={isStudying}
        toggleStudying={toggleStudying}
      />
      
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)