import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilesByAffaireInterneId, getFileInterneContent, uploadFileInterne } from './UtilisateurService'; // Importez les fonctions nécessaires
import moment from 'moment'; 
import Layout from './Layout';
import './fichier.css';
const FichierIntern = () => {
  const { id } = useParams(); // Récupérez l'ID de l'affaire depuis les paramètres d'URL
  const [files, setFiles] = useState([]); // État pour stocker les fichiers
  const [selectedFileContent, setSelectedFileContent] = useState(''); // État pour stocker le contenu du fichier sélectionné
  const [selectedFile, setSelectedFile] = useState(null); // État pour stocker le fichier sélectionné
  // État pour indiquer si un fichier est en cours de téléchargement

  useEffect(() => {
    // Fonction pour récupérer les fichiers associés à l'affaire
    const fetchFiles = async () => {
      try {
        const response = await getFilesByAffaireInterneId(id); // Utilisez la fonction pour récupérer les fichiers
        setFiles(response.data); // Mettez à jour l'état avec les fichiers récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des fichiers:', error);
      }
    };

    fetchFiles(); // Appelez la fonction pour récupérer les fichiers lorsque le composant est monté
  }, [id]);

  const handleFileClick = async (fileId) => {
    try {
      const file = await getFileInterneContent(fileId);
      const pdfUrl = URL.createObjectURL(file); // Convertir le blob en URL d'objet
     
      // Afficher le PDF dans votre interface utilisateur
      setSelectedFileContent(<embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />);
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu du fichier:', error);
    }
  };
  


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('dossierId', id);
      await uploadFileInterne(formData);
      // Mettre à jour la liste des fichiers après avoir téléversé le nouveau fichier
      const response = await getFilesByAffaireInterneId(id);
      setFiles(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du fichier:', error);
    }
  };

  // Affichage de la liste des fichiers
  return (
    <Layout>
    <div className='fichier'>
    <h4> Ajouter votre fichier</h4>
      <form className='formfichier' onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className='ajouterComm'>Ajouter </button>
      </form>
      <h3>Liste des fichiers associés à  cette affaire</h3>
       <table className="table table-bordered">
            <thead className="table-light">
          <tr>
           
            <th>Nom du fichier</th>
            <th>Date d'ajout</th>
            
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} onClick={() => handleFileClick(file.id)}> {/* Ajoutez un gestionnaire d'événements pour récupérer le contenu du fichier */}
              
              <td>{file.name}</td>
              <td> {moment(file.dateCreation).format('DD/MM/YYYY HH:mm')}</td>
             
            </tr>
          ))}
        </tbody>
      </table> </div>
      <div className='cont'>
        <h3>Contenu du fichier sélectionné :</h3>
        <pre>{selectedFileContent}</pre>
      </div>
    
   
    </Layout>
  );
};

export default FichierIntern;
