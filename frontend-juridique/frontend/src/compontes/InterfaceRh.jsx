import React from 'react';
import { useNavigate } from 'react-router-dom';
import './choix.css'; // Importer le fichier CSS

const Choix = () => {
  const navigator = useNavigate();

  function moveToCCL() {
   
    navigator("/listeaffairinterne/CCL");
  }

  function moveToDossier () {

    navigator("/listeaffairinterne/Dossier Interne");
  }

  return (
    <div className="container">
      <div className="button-container">
        <button className="button" id="btnn"onClick={moveToCCL}>CCL</button>
        <button className="button" id='btnnn' onClick={moveToDossier}>Dossier Interne</button>
      </div>
    </div>
  );
}

export default Choix;
