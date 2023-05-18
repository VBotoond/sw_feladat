import React, { useState } from "react";
import "../comps/UpdateWindow.css";

const UpdateWindow = ({ character, onClose, onSubmit, likeCount, id }) => {
  const [nev, setNev] = useState(character.nev);
  const [bolygo, setBolygo] = useState(character.bolygo);
  const [faj, setFaj] = useState(character.faj);

  const updateWindowStyle = {
    width: "300px",
    height: "300px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    color: "black",
    fontSize: "18px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCharacter = { id, nev, bolygo, faj, like: likeCount };
    onSubmit(updatedCharacter, likeCount);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-blue-500 p-4 rounded-md" style={updateWindowStyle}>
        <div style={{ position: "relative" }}>
          <button onClick={onClose} style={closeButtonStyle}>
            <span className="close-button ">X</span>
          </button>
        </div>
        <br />
        <form className="form-container" onSubmit={handleSubmit}>
          <label>Név:</label>
          <input
            type="text"
            value={nev}
            onChange={(e) => setNev(e.target.value)}
            className="mb-2"
          />

          <label>Bolygó:</label>
          <input
            type="text"
            value={bolygo}
            onChange={(e) => setBolygo(e.target.value)}
            className="mb-2"
          />

          <label>Faj:</label>
          <input
            type="text"
            value={faj}
            onChange={(e) => setFaj(e.target.value)}
            className="mb-2"
          />

          <button
            type="submit"
            className="bg-white text-blue-500 px-4 py-2 rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWindow;
