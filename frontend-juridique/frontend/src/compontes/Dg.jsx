import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {addAffaire,getAffaireById,getAllAffaire,sendEmail, updateAffaire} from "./UtilisateurService";
import './Dg.css'

import NavBar from './NavBar';

const Dg = () => {
  const { val } = useParams();
  const [nameAvocat, setNameAvocat] = useState("");
const [nameEmployee, setNameEmployee] = useState("");
const [matriculeEmployee, setMatriculeEmployee] = useState("");
const [typeAffaire, setType] = useState("");
const [status, setStatus] = useState("");
const [avis, setAvis] = useState("");
const [dateReunion, setDateReunion] = useState("");
const [plant, setPlant] = useState("");
const[periodeNotification,setPeriodeNotification]=useState("")
const [montantGlobal , setMontantGlobal] = useState("");
const [montantEntrant , setMontantEntrant] = useState("");
const navigator =useNavigate();
const {id} = useParams();

const handleNameAvocat = (e) => setNameAvocat(e.target.value);
const handlePlant = (e) => setPlant(e.target.value);

const handleNameEmployee = (e) => setNameEmployee(e.target.value);

const handleType = (e) => setType(e.target.value);

const handleMatriculeEmployee = (e) => setMatriculeEmployee(e.target.value);


const handleMontantE = (e) => setMontantEntrant(e.target.value);

const handleMontantG = (e) => setMontantGlobal(e.target.value);


const handleAvis = (e) => setAvis(e.target.value);

const handleDate = (e) => setDateReunion(e.target.value);

const [errors, setErrors] = useState({
  nameAvocat: "",
  nameEmployee: "",
  matriculeEmployee:"",
  typeAffaire:"",
  status:"",
  avis:"",
  date:"",
  periodeNotification:"",
  plant:"",
  montantGlobal:"",
  montantEntrant:""
});
useEffect(() => {
  if (id) {
  
      getAffaireById(id)
      .then((response) => {
        const formattedDateReunion = formatDate(response.data.dateReunion);
          setNameAvocat(response.data.nameAvocat);
          setNameEmployee(response.data.nameEmployee);
          setMatriculeEmployee(response.data.matriculeEmployee);
          setType(response.data.typeAffaire);
          
          setAvis(response.data.avis);
          setDateReunion(formattedDateReunion);
          
          setPlant(response.data.plant);
          setMontantGlobal(response.data.montantGlobal);
          setMontantEntrant(response.data.montantEntrant);
         
        setPeriodeNotification(response.data.periodeNotification);

      })
      .catch((error) => {
          console.log(error);
      });
  }
}, [id]);

function formatDate(rawDate) {
  const dateObj = new Date(rawDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
function valideAffaire(e) {
  e.preventDefault();
  if (validateForm()) {
    const formattedDateReunion = formatDate(dateReunion);
    const status="Validé"
      const affaire = {nameAvocat,nameEmployee,matriculeEmployee,typeAffaire,status,avis,dateReunion: formattedDateReunion,periodeNotification,plant,montantGlobal,montantEntrant};
     
      if(id){
       
        updateAffaire(id,affaire)
        .then((response) => {
            console.log(response.data);
           
        })
        .catch((error) => {
            console.log(error);
        });
    }
     
      
       
      
   } }
   function refuseAffaire(e) {
    e.preventDefault();
    if (validateForm()) {
      const formattedDateReunion = formatDate(dateReunion);
      const status="refuse"
        const affaire = {nameAvocat,nameEmployee,matriculeEmployee,typeAffaire,status,avis,dateReunion: formattedDateReunion,plant,montantGlobal,montantEntrant};
       
        if(id){
         
          updateAffaire(id,affaire)
          .then((response) => {
              console.log(response.data);
             
          })
          .catch((error) => {
              console.log(error);
          });
      }
       
        
         
        
     } }

 function validateForm() {
  let valid = true;
  const errorsCopy = { ...errors };

  if (nameAvocat.trim()) {
    errorsCopy.nameAvocat = "";
  } else {
    errorsCopy.nameAvocat = "Name Avocat is required";
    valid = false;
  }

  if (nameEmployee.trim()) {
    errorsCopy.nameEmployee = "";
  } else {
    errorsCopy.nameEmployee = "Name Employee is required";
    valid = false;
  }

  if (dateReunion.trim()) {
    errorsCopy.dateReunion = "";
  } else {
    errorsCopy.dateReunion = "Date is required";
    valid = false;
  }

  setErrors(errorsCopy);
  return valid;
}



  return (
    <div>
   
   
      <div className="card">
      <h4 id='title'>  Nouvelle Affaire</h4>
       <form>
        
      <div id="dg"  className='inputs'>
      <label htmlFor="nameAvocat">Nom-Prénom Avocat</label>
        <input type="text" placeholder='Enter a name Avocat' name="nameAvocat" value={nameAvocat} onChange={handleNameAvocat}></input>
        {errors.nameAvocat && <div className="invalid-feedback" >{errors.nameAvocat}</div>}
      </div>
      <div id="dg"  className='inputs'>
      <label htmlFor="nameAvocat">Nom-Prénom Client</label>
        <input type="text" placeholder='Enter a name Employee' name="nameEmployee" value={nameEmployee} onChange={handleNameEmployee}></input>
        {errors.nameEmployee && <div className="invalid-feedback">{errors.nameEmployee}</div>}
      </div>
     

      <div id="dg"  className="inputs">
      <label htmlFor="nameAvocat">Matricule Client</label>
      <input type="number" placeholder='Enter a matriculeEmployee' name="matriculeEmployee" value={matriculeEmployee} onChange={handleMatriculeEmployee}></input>
      </div>
      <div id="dg"  className="inputs">
      <label htmlFor="nameAvocat">Date Reunion</label>
      <input type="date" placeholder='Enter a date' name="dateReunion" value={dateReunion} onChange={handleDate}></input>
        {errors.dateReunion && <div className="invalid-feedback">{errors.dateReunion}</div>}
      </div>
      <div id="dg"  className='inputs'>
      <label htmlFor="nameAvocat">Type  Affaire</label>
    <select className="custom-select" name='typeAffaire' onChange={handleType} value={typeAffaire}>
      <option value="Problémes commerciaux">Affaire Commerciaux القضايا التجارية </option>
      <option value="Problémes civiles">Affaire Civiles القضايا المدنية</option>
      <option value="Problémes criminelles">Affaire Criminelles القضايا الجزائية</option>
      <option value="Objections administratives">Objections Administratives  الإعتراضات الإدارية</option>
      <option value="Correspondance administratives legal">Correspondance administratives المراسلات الإدارية</option>
      <option value="Risque">Risque المخاطر</option>
      <option value="Conseils juridique legal">Conseils juridique الإستشارات القانونية</option>
    
<option value="Problémes de travail">Problémes de travail القضاياالشغلية</option>
<option value="Affectation au salaire">Affectation au salaire الإحالة على المرتب</option>
<option value="Inspection du travail">Inspection du travail تفقدية الشغل</option>
<option value="Correspondance administratives ">Corre   spondance administratives المراسلات الإدارية</option>
<option value="Conseils juridique ">Conseils juridique الإستشارات القانونية</option>

</select>
  </div>
  <div id="dg"  className="inputs">
  <label htmlFor="nameAvocat">Plant</label>
      <select className="custom-select" name='plant' onChange={handlePlant} value={plant}>
    
      <option value="MH1">MH1</option>
      <option value="MH2"> MH2</option>
      <option value="AUDI">AUDI</option>
      <option value="OEM"> OEM</option>
      <option value="BMW">BMW</option>
      <option value="VW"> VW</option>
      </select>
      </div>
 
      
      <div id="dg" className="inputs">
      <label htmlFor="nameAvocat">Déscription</label>
      <textarea rows="4" cols="30" name="avis" value={avis} onChange={handleAvis}></textarea>
      </div>
    <div className="buttons">
      <button   value="valide"className="btn btn-primary" onClick={valideAffaire}>valide</button>
     
      <button value="refuse"className="btn btn-primary" onClick={refuseAffaire}>Refuse</button></div>
      
     </form>
   </div>
   </div>
  
  )
}

export default Dg