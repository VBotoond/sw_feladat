import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateWindow from "../comps/UpdateWindow";

function HomePage() {
  const [nev, setNev] = useState("");
  const [bolygo, setBolygo] = useState("");
  const [faj, setFaj] = useState("");
  const [tableData, setTableData] = useState([]);
  const [likeCount, setLikeCount] = useState({});
  const [showCounter, setShowCounter] = useState(true);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [updateIndex, setUpdateIndex] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/getAll")
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Hiba történt a karakterek lekérése közben:", error);
      });
  }, []);

  useEffect(() => {
    const isFormValid = nev !== "" && bolygo !== "" && faj !== "";
    setSubmitButtonDisabled(!isFormValid);
  }, [nev, bolygo, faj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { nev, bolygo, faj };
    axios
      .post("http://localhost:8080/create", newData)
      .then((response) => {
        setTableData([...tableData, response.data]);
        setNev("");
        setBolygo("");
        setFaj("");
        console.log("Adatok sikeresen mentve a szerverre.");
      })
      .catch((error) => {
        console.error("Hiba történt az adatok mentése közben:", error);
      });
  };

  const handleLike = (index) => {
    const character = tableData[index];
    const updatedCharacter = { ...character, like: character.like + 1 };
    axios
      .put(`http://localhost:8080/updateLike/${character.id}`, {
        like: updatedCharacter.like,
      })
      .then(() => {
        const updatedData = [...tableData];
        updatedData[index] = updatedCharacter;
        setTableData(updatedData);
      })
      .catch((error) => {
        console.error("Hiba történt a kedvelés frissítése közben:", error);
      });
  };

  const handleDelete = (index) => {
    const character = tableData[index];
    axios
      .delete(`http://localhost:8080/delete/${character.id}`)
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        console.error("Hiba történt a karakter törlése közben:", error);
      });
  };

  const handleUpdate = (index) => {
    const character = tableData[index];
    setUpdateIndex(index);
    setLikeCount(character.like);
  };

  const handleUpdateWindowClose = () => {
    setUpdateIndex(null);
  };

  const handleUpdateSubmit = (updatedCharacter, updatedLikeCount) => {
    axios
      .put(
        `http://localhost:8080/update/${updatedCharacter.id}`,
        updatedCharacter
      )
      .then((response) => {
        const updatedData = [...tableData];
        updatedData[updateIndex] = response.data;
        setTableData(updatedData);
        setLikeCount(updatedLikeCount);
        setUpdateIndex(null);
      })
      .catch((error) => {
        console.error("Hiba történt a karakter frissítése közben:", error);
      });
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex mb-4">
          <label htmlFor="nev" className="w-1/4 pr-2">
            Név:
          </label>
          <input
            type="text"
            id="nev"
            value={nev}
            onChange={(e) => setNev(e.target.value)}
            className="w-3/4 px-2 py-1 border border-gray-300"
          />
        </div>
        <div className="flex mb-4">
          <label htmlFor="bolygo" className="w-1/4 pr-2">
            Bolygó:
          </label>
          <input
            type="text"
            id="bolygo"
            value={bolygo}
            onChange={(e) => setBolygo(e.target.value)}
            className="w-3/4 px-2 py-1 border border-gray-300"
          />
        </div>
        <div className="flex mb-4">
          <label htmlFor="faj" className="w-1/4 pr-2">
            Faj:
          </label>
          <input
            type="text"
            id="faj"
            value={faj}
            onChange={(e) => setFaj(e.target.value)}
            className="w-3/4 px-2 py-1 border border-gray-300"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  ${
              submitButtonDisabled ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
            disabled={submitButtonDisabled}
          >
            Küldés
          </button>
        </div>
      </form>
      {updateIndex !== null && (
        <UpdateWindow
          character={tableData[updateIndex]}
          onSubmit={handleUpdateSubmit}
          onClose={handleUpdateWindowClose}
          likeCount={likeCount} // Pass the likeCount value here
          id={tableData[updateIndex].id} // Pass the id value here
        />
      )}
      <table className="w-full mx-40">
        <thead>
          <tr>
            <th className="py-2">Név</th>
            <th className="py-2">Bolygó</th>
            <th className="py-2">Faj</th>
            <th className="py-2">Számláló</th>
            <th className="py-2">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td className="py-2 text-center align-middle">{data.nev}</td>
              <td className="py-2 text-center align-middle">{data.bolygo}</td>
              <td className="py-2 text-center align-middle">{data.faj}</td>
              <td className="py-2 text-center align-middle flex justify-center items-center">
                <div className="h-6 w-6 bg-green-500 rounded-full">
                  <span className="text-white">{data.like}</span>
                </div>
              </td>
              <td className="py-2 text-center align-middle">
                <button
                  onClick={() => handleUpdate(index)}
                  className="px-2 py-1 mr-2 bg-yellow-500 text-white rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleLike(index)}
                  className="px-2 py-1 mr-2 bg-green-500 text-white rounded"
                >
                  Like
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
