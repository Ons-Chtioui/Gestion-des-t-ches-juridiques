import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { RiCheckLine } from 'react-icons/ri';
import './Affaire.css'; // Assurez-vous d'inclure vos styles
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import {getAffaireInterneById} from './UtilisateurService'; 
const AffaireForm = () => {
  const [name, setName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [typeAffaire, setTypeAffaire] = useState("");
  const [dateEmbouche, setDateEmbouche] = useState("");
  const [probleme, setProbleme] = useState("");
  const [raison, setRaison] = useState("");
  const [questionair, setQuestionair] = useState("");
  const [ancienne, setAncienne] = useState("");
  const [année, setAnnee] = useState("");
  const [message, setMessage] = useState("");
  const navigator =useNavigate();
  const { val } = useParams();
  const { id } = useParams();

  function formatDate(rawDate) {
    const dateObj = new Date(rawDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }

  useEffect(() => {
    if (id) {
    
        getAffaireInterneById(id)
        .then((response) => {
          const formattedDateEmbouche = formatDate(response.data.dateEmbouche);
            setName(response.data.name)
            setDateEmbouche(formattedDateEmbouche)
            setMatricule(response.data.matricule);
            setProbleme(response.data.probleme)
            setAncienne(response.data.ancienne)
            setTypeAffaire(response.data.typeAffaire);
            setQuestionair(response.data.questionair)
            setRaison(response.data.raison)
            setAnnee(response.data.année)
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const affaireInterne = {
      name,
      matricule,
      typeAffaire,
      dateEmbouche,
      probleme,
      raison,
      questionair,
      ancienne,
      année
    };
   if(id)  { try {
    const response = await axios.put(`http://localhost:3020/api/affaireInterne/${id}`, affaireInterne,id);
    setMessage(`Affaire enregistrée avec l'ID: ${response.data}`);
    console.log('ok')
    
    navigator(`/listeaffairinterne/${val}`)
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'affaire', error);
    setMessage('Erreur lors de l\'enregistrement de l\'affaire');
  }} else{
    try {
      const response = await axios.post('http://localhost:3020/api/affaireInterne/save', affaireInterne);
      setMessage(`Affaire enregistrée avec l'ID: ${response.data}`);
      console.log('ok')
      
      navigator(`/listeaffairinterne/${val}`)
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'affaire', error);
      setMessage('Erreur lors de l\'enregistrement de l\'affaire');
    }
  };}
  function title(){
   
    if(id) return   <h1 className="card-title">Modifier Affaire</h1>
    else return  <h1 className="card-title">Ajouter Affaire</h1>
    
  }
  function type(){
   
    if(id) return  <></>
    else return <div className='inputs'>
    <select className="custom-select"
      value={typeAffaire} 
      onChange={(e) => setTypeAffaire(e.target.value)} 
      required
    >
      <option value="">Sélectionner le type d'affaire</option>
      <option value="CCL">CCL</option>
      <option value="Dossier Interne">Dossier Interne</option>
    </select>
  </div>
    
  }
  

  function Aff(){
   
  if(val==="CCL") return <><div className='inputs'>
  <textarea 
    placeholder="Raison" 
    value={raison} 
    onChange={(e) => setRaison(e.target.value)} 
    required 
  />
</div>

<div className='inputs'>
  <input 
    type="number" 
    placeholder="Ancienne" 
    value={ancienne} 
    onChange={(e) => setAncienne(e.target.value)} 
    required 
  />
</div>
<div className='inputs'>
  <input 
    type="number" 
    placeholder="Année" 
    value={année} 
    onChange={(e) => setAnnee(e.target.value)} 
    required 
  />
</div></>
else return <div>  <div className='inputs'>

<select className="custom-select" name='questionair'  value={questionair}   onChange={(e) => setQuestionair(e.target.value)}   required>
  <option value="">Sélectionner le questionnaire</option>
  <option value="orale">Orale</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="Conseil avec Travail">Conseil avec Travail</option>
  <option value="Conseil">Conseil</option>
</select>
</div>
  <div className='inputs'>
  <input 
    type="date" 
    value={dateEmbouche} 
    onChange={(e) => setDateEmbouche(e.target.value)} 
    required 
  />
</div>
<div className='inputs'>
  <textarea 
    placeholder="Problème" 
    value={probleme} 
    onChange={(e) => setProbleme(e.target.value)} 
    required 
  />
</div></div>
  }
  function valide(){
    if(id && val==="CCL")return <div className='inputs'>

    <select className="custom-select" name='probleme'  value={probleme}   onChange={(e) => setProbleme(e.target.value)}   required>
      <option value="">Sélectionner ton choix</option>
      <option value="Validé">Validé</option>
      <option value="Réfuse">Réfuse</option>
     
    </select>
    </div>
    else <></>
    
  }




  return (
    <Layout>
    
      <div className="card">
      
         {title()}
         
          <form onSubmit={handleSubmit}  className='FormAffaire'>
            <div className='inputs'>
              <input 
                type="text" 
                placeholder="Nom" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className='inputs'>
              <input 
                type="number" 
                placeholder="Matricule" 
                value={matricule} 
                onChange={(e) => setMatricule(e.target.value)} 
                required 
              />
            </div>
         
           {type()}
            {Aff()}
            {valide()}
            <button type="submit" className="btn btn-primary">
<RiCheckLine /> Ajouter
</button>
          </form>
        </div>
     
  
    </Layout>
  );
};

export default AffaireForm;
