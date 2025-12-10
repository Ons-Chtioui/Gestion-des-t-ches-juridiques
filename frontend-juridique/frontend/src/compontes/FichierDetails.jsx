import React from 'react';
import { useLocation } from 'react-router-dom';

const FichierDetails = () => {
  const location = useLocation();
  const { fileContent } = location.state;

  return (
    <div>
      <h2>Détails du fichier</h2>
      <pre>{fileContent}</pre>
    </div>
  );
};

export default FichierDetails;
