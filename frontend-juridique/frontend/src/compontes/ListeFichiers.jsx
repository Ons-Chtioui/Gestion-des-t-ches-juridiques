// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getFilesByAffaireId, getFileContent, uploadFile } from './UtilisateurService';
// import './fichier.css';
// import Layout from './Layout';
// import moment from 'moment';
// import CryptoJS from 'crypto-js';

// const ListeFichiers = () => {
//   const { id } = useParams();
//   const [files, setFiles] = useState([]);
//   const [selectedFileContent, setSelectedFileContent] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await getFilesByAffaireId(id);
//         setFiles(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des fichiers:', error);
//       }
//     };

//     fetchFiles();
//   }, [id]);

//   const handleFileClick = async (fileId) => {
//     try {
//       const file = await getFileContent(fileId);
//       const pdfUrl = URL.createObjectURL(file);
//       setSelectedFileContent(<embed src={pdfUrl} type="application/pdf" width="100%" height="600px" />);
//     } catch (error) {
//       console.error('Erreur lors de la récupération du contenu du fichier:', error);
//     }
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('file', selectedFile);
//       formData.append('dossierId', id);
//       await uploadFile(formData);
//       const response = await getFilesByAffaireId(id);
//       setFiles(response.data);
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du fichier:', error);
//     }
//   };

//   const handleEncrypt = async (file) => {
//     try {
//       const response = await getFileContent(file.id);
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         const fileContent = e.target.result;
//         const wordArray = CryptoJS.lib.WordArray.create(fileContent);
//         const encryptedContent = CryptoJS.AES.encrypt(wordArray, 'secret-key').toString();
//         const encryptedBlob = new Blob([encryptedContent], { type: 'text/plain' });

//         const formData = new FormData();
//         formData.append('file', encryptedBlob, file.name);
//         formData.append('dossierId', id);

//         await uploadFile(formData);
//         const updatedFiles = await getFilesByAffaireId(id);
//         setFiles(updatedFiles.data);
//       };
//       reader.readAsArrayBuffer(response);
//     } catch (error) {
//       console.error('Erreur lors du chiffrement du fichier:', error);
//     }
//   };

//   // const handleDecrypt = async (file) => {
//   //   try {
//   //     const response = await getFileContent(file.id);
//   //     const reader = new FileReader();
//   //     reader.onload = (e) => {
//   //       const encryptedContent = e.target.result;
//   //       const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent, 'secret-key');
//   //       const decryptedWordArray = CryptoJS.enc.Base64.stringify(decryptedBytes);
//   //       const decryptedContent = atob(decryptedWordArray);
//   //       const byteCharacters = decryptedContent.split('').map(char => char.charCodeAt(0));
//   //       const byteArray = new Uint8Array(byteCharacters);
//   //       const blob = new Blob([byteArray], { type: 'image/jpeg'}); // Modifier le type MIME selon le format de l'image
//   //       const imageUrl = URL.createObjectURL(blob);
//   //       setSelectedFileContent(<img src={imageUrl} alt="Image déchiffrée"  width="100%" height="600px"  />);
//   //     };
//   //     reader.readAsText(response);
//   //   } catch (error) {
//   //     console.error('Erreur lors du déchiffrement du fichier:' ,error);
//   //   }
//   // };
//   const handleDecrypt = async (file) => {
//     try {
//       const response = await getFileContent(file.id);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const encryptedContent = e.target.result;
//         const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent, 'secret-key');
//         const decryptedWordArray = CryptoJS.enc.Base64.stringify(decryptedBytes);
//         const decryptedContent = atob(decryptedWordArray);
//         const byteCharacters = decryptedContent.split('').map(char => char.charCodeAt(0));
//         const byteArray = new Uint8Array(byteCharacters);
//         let blob, content;
  
//         // Détecter le type de fichier en fonction de l'extension
//         if (file.name.toLowerCase().endsWith('.pdf')) {
//           // Pour les PDF
//           blob = new Blob([byteArray], { type: 'application/pdf' });
//           content = <embed src={URL.createObjectURL(blob)} type="application/pdf" width="100%" height="600px" />;
//         } 
//         else {
//           const blob = new Blob([byteArray], { type: 'image/jpeg'}); // Modifier le type MIME selon le format de l'image
//        content = <img src={URL.createObjectURL(blob)} alt="Image déchiffrée" style={{ width: '100%', height: 'auto' }} />;
//           } 
        
  
//         setSelectedFileContent(content);
//       };
//       reader.readAsText(response);
//     } catch (error) {
//       console.error('Erreur lors du déchiffrement du fichier:', error);
//     }
//   };
  
//   return (
//     <Layout>
//       <div className='fichier'>
//         <h4> Ajouter votre fichier</h4>
//         <form className='formfichier' onSubmit={handleSubmit}>
//           <input type="file" onChange={handleFileChange} />
//           <button type="submit" className='ajouterComm'>Ajouter </button>
//         </form>
//         <h3>Liste des fichiers associés à cette affaire</h3>
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr>
//               <th>Nom du fichier</th>
//               <th>Date d'ajout</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {files.map((file) => (
//               <tr key={file.id}>
//                 <td onClick={() => handleFileClick(file.id)}>{file.name}</td>
//                 <td>{moment(file.dateCreation).format('DD/MM/YYYY HH:mm')}</td>
//                 <td>
//                   <button onClick={() => handleEncrypt(file)}>Crypter</button>
//                   <button onClick={() => handleDecrypt(file)}>Décrypter</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className='cont'>
//         <h3>Contenu du fichier sélectionné :</h3>
//         <pre>{selectedFileContent}</pre>
//       </div>
//     </Layout>
//   );
// };

// export default ListeFichiers;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilesByAffaireId, getFileContent, uploadFile,deleteFile } from './UtilisateurService';
import './fichier.css';
import Layout from './Layout';
import moment from 'moment';
import CryptoJS from 'crypto-js';
import { useAuth } from './useAuth';

const ListeFichiers = () => {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [selectedFileContent, setSelectedFileContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, }=useAuth();
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFilesByAffaireId(id);
        setFiles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des fichiers:', error);
      }
    };

    fetchFiles();
  }, [id]);

  const handleFileClick = async (fileId) => {
    try {
      const file = await getFileContent(fileId);
      const pdfUrl = URL.createObjectURL(file);
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
      await uploadFile(formData);
      const response = await getFilesByAffaireId(id);
      setFiles(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du fichier:', error);
    }
  };

  const handleEncrypt = async (file) => {
    try {
      const response = await getFileContent(file.id);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        const wordArray = CryptoJS.lib.WordArray.create(fileContent);
        const encryptedContent = CryptoJS.AES.encrypt(wordArray, 'secret-key').toString();
        const encryptedBlob = new Blob([encryptedContent], { type: 'text/plain' });

        const formData = new FormData();
        formData.append('file', encryptedBlob, file.name);
        formData.append('dossierId', id);

        await uploadFile(formData);
        await deleteFile(file.id); // Suppression du fichier initial après l'encryptage
         console.log(file.id)
        const updatedFiles = await getFilesByAffaireId(id);
        setFiles(updatedFiles.data);
      };
      reader.readAsArrayBuffer(response);
    } catch (error) {
      console.error('Erreur lors du chiffrement du fichier:', error);
    }
  };
  const handleDecrypt = async (file) => {
    try {
      const response = await getFileContent(file.id);
      const reader = new FileReader();
      reader.onload = (e) => {
        const encryptedContent = e.target.result;
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedContent, 'secret-key');
        const decryptedWordArray = CryptoJS.enc.Base64.stringify(decryptedBytes);
        const decryptedContent = atob(decryptedWordArray);
        const byteCharacters = decryptedContent.split('').map(char => char.charCodeAt(0));
        const byteArray = new Uint8Array(byteCharacters);
        let blob, content;
  
        // Détecter le type de fichier en fonction de l'extension
        if (file.name.toLowerCase().endsWith('.pdf')) {
          // Pour les PDF
          blob = new Blob([byteArray], { type: 'application/pdf' });
          content = <embed src={URL.createObjectURL(blob)} type="application/pdf" width="100%" height="600px" />;
        } 
        else {
          const blob = new Blob([byteArray], { type: 'image/jpeg'}); // Modifier le type MIME selon le format de l'image
          content = <img src={URL.createObjectURL(blob)} alt="Image déchiffrée" style={{ width: '100%', height: 'auto' }} />;
          } 
        
  
        setSelectedFileContent(content);
      };
      reader.readAsText(response);
    } catch (error) {
      console.error('Erreur lors du déchiffrement du fichier:', error);
    }
  };
   
              
  return (
    <Layout>
      <div className='fichier'>
        <h4> Ajouter votre fichier</h4>
        <form className='formfichier' onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit" className='ajouterComm'>Ajouter </button>
        </form>
        <h3>Liste des fichiers associés à cette affaire</h3>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Nom du fichier</th>
              <th>Date d'ajout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td onClick={() => handleFileClick(file.id)}>{file.name}</td>
                <td>{moment(file.dateCreation).format('DD/MM/YYYY HH:mm')}</td>
                {user.userType === "Admin" ? (
                    
          <td> 
        <button className='btn btn-info' onClick={() => handleEncrypt(file)}>Crypter</button>
        <button className='btn btn-danger' onClick={() => handleDecrypt(file)}>Décrypter</button>
          </td>
            
            ) : null}
              </tr>))}
          </tbody>
        </table>
      </div>
      <div className='cont'>
        <h3>Contenu du fichier sélectionné :</h3>
        <pre>{selectedFileContent}</pre>
      </div>
    </Layout>
  );
};

export default ListeFichiers;
