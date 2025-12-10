import axios from 'axios';

const REST_API_BASE_URL='http://localhost:3020/api/v1/utilisateur';

export const addUtilisateur=(utilisateur)=>axios.post('http://localhost:3020/api/v1/utilisateur/save',utilisateur);

export const listUtilisateurs =() => axios.get(REST_API_BASE_URL);

export const getUtilisateur=(utilisateurId)=>axios.get(REST_API_BASE_URL+'/'+utilisateurId);

export const updateUtilisateur=(id,utilisateur)=>axios.put(REST_API_BASE_URL+'/'+id,utilisateur);


export const deleteUtilisateur=(utilisateurId)=>axios.delete(REST_API_BASE_URL+'/'+utilisateurId);
const BASE_URL = 'http://localhost:3020';
//Fonction pour récupérer tous les fichiers d'une affaire par son ID
export const getFilesByAffaireId=(id)=>axios.get(`http://localhost:3020/getfilesbyaffaire/${id}`);
// Fonction pour téléverser un fichier pour une affaire spécifique
export const uploadFile=(formData)=>axios.post("http://localhost:3020/uploadfile",formData);
  // Fonction pour récupérer le contenu du fichier par son ID
  export const getFileContent = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:3020/getfileparid/${fileId}`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu du fichier:', error);
      throw error;
    }
  };

 // Fonction pour récupérer les commentaires associés à une affaire par son ID
 export const getCommentsByAffaireId =  (affaireId) => axios.get(`http://localhost:3020/commentaires/affaire/${affaireId}`);
  // Fonction pour ajouter un nouveau commentaire à une affaire

export const addComment = (newComment, affaireId) => {
  return axios.post("http://localhost:3020/commentaires", newComment, { params: { affaireId } });
};

const API='http://localhost:3020/api/affaire/get';

export const addAffaire=(affaire)=>axios.post('http://localhost:3020/api/affaire/save',affaire);

export const addEvenement = (evenement) => {
  // Ensure emails are sent as an array
  const eventData = {
    ...evenement,
    emails: Array.isArray(evenement.emails) ? evenement.emails : [evenement.emails]
  };
  return axios.post('http://localhost:3020/api/Evenement/add', eventData);
};

export const getAllEvenements = async () => {
  try {
    const response = await axios.get('http://localhost:3020/api/Evenement');
    const events = response.data.map(event => {
      let emails = []; // Initialiser une liste vide pour les emails
      // Vérifier si le champ 'emails' n'est pas nul et est une liste
      if (event.emails && Array.isArray(event.emails)) {
        emails = event.emails; // Utiliser la liste 'emails' directement
      } else if (event.emails && typeof event.emails === 'string') {
        // Si le champ 'emails' est une chaîne, le parser en liste
        emails = event.emails.split(',').map(email => email.trim());
      }
      return { ...event, emails }; // Retourner l'objet événement avec les emails transformés
    });
    return events;
  } catch (error) {
    throw error; // Gérer l'erreur de manière appropriée
  }
};
const urleve="http://localhost:3020/api/Evenement";
export const deleteEvenement=(evenementId)=>axios.delete(urleve+'/'+evenementId);

export const getEvenementById=(evenementId)=>axios.get(urleve+'/'+evenementId);

export const updateEvenement=(id,evenement)=>axios.put(urleve+'/'+id,evenementw);

export const getAffaireById=(id)=>axios.get(API+'/'+id);
const APIUP='http://localhost:3020/api/affaire';

export const updateAffaire=(id,affaire)=>axios.put(APIUP+'/'+id,affaire);

export const getAllAffaire=()=>axios.get(APIUP);

const REST_API='http://localhost:3020/api/affaire/type';

export const getAffaireByType=(typeAffaire)=>axios.get(REST_API+'/'+typeAffaire);

const REST_APIinterne='http://localhost:3020/api/affaireInterne/type'
export const getAffaireInternByType=(typeAffaire)=>axios.get(REST_APIinterne+'/'+typeAffaire);

const RESTStatus_API='http://localhost:3020/api/affaire/status';

export const getAffaireByStatus=(status)=>axios.get(RESTStatus_API+'/'+status);

export const sendEmail=(to,cc,subject,body)=>axios.post('http://localhost:3020/mail/notification',to,cc,subject,body);


//Fonction pour récupérer tous les fichiers d'une affaire par son ID
export const getFilesByAffaireInterneId=(id)=>axios.get(`http://localhost:3020/interne/getfilesbyaffaire/${id}`);
// Fonction pour téléverser un fichier pour une affaire spécifique
export const uploadFileInterne=(formData)=>axios.post("http://localhost:3020/interne/uploadfile",formData);
  // Fonction pour récupérer le contenu du fichier par son ID
  export const getFileInterneContent = async (fileId) => {
    try {
      const response = await axios.get(`http://localhost:3020/interne/getfileparid/${fileId}`, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu du fichier:', error);
      throw error;
    }
  };
 const delurl="http://localhost:3020/deletefile"
  export const deleteFile=(id)=>axios.delete(delurl+'/'+id);

  const APIin='http://localhost:3020/api/affaireInterne/get'; 
export const getAffaireInterneById=(id)=>axios.get(APIin+'/'+id);