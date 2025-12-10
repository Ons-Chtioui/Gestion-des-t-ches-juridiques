import React from 'react';
import { useNavigate } from 'react-router-dom';
import './choix.css'; // Importer le fichier CSS

const Choix = () => {
  const navigator = useNavigate();

  function moveToLegal() {
    const val = "legaLlegal";
    navigator(`/legalLegal/${val}`);
  }

  function moveToRh() {
    const val = "legalrh";
    navigator(`/legalrh/${val}`);
  }

  return (
    <div className="container">
      <div className="button-container">
        <button className="button" id="btnn"onClick={moveToLegal}>LEGAL LEGAL</button>
        <button className="button" id='btnnn' onClick={moveToRh}>LEGAL RH</button>
      </div>
    </div>
  );
}

export default Choix;
