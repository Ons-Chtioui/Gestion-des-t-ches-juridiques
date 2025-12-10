import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RiCheckLine } from 'react-icons/ri';

import {addAffaire,getAffaireById,getAllAffaire,sendEmail, updateAffaire} from "./UtilisateurService";
import './Affaire.css'
import axios from "axios";
import NavBar from './NavBar';

import { DIRECTOR_EMAIL, DIRECTOR_FIRSTNAME, DIRECTOR_LASTNAME, EMAIL_SUBJECT } from '../constant/constant';
import Layout from './Layout';

const Affaire = () => {
  const { val } = useParams();
  const { typeAffairee } = useParams();
  const [nameAvocat, setNameAvocat] = useState("");
const [nameEmployee, setNameEmployee] = useState("");
const [matriculeEmployee, setMatriculeEmployee] = useState("");
const [typeAffaire, setType] = useState("");
const [status, setStatus] = useState("");
const [avis, setAvis] = useState("");
const [dateReunion, setDateReunion] = useState("");
const [plant, setPlant] = useState("");
const [periodeNotification , setPeriodeNotification] = useState("");
const [montantGlobal , setMontantGlobal] = useState("");
const [montantEntrant , setMontantEntrant] = useState("");
const [emails, setEmails] = useState([]);
const navigator =useNavigate();
const {id} = useParams();
    
const handleNameAvocat = (e) => setNameAvocat(e.target.value);
const handlePlant = (e) => setPlant(e.target.value);

const handleNameEmployee = (e) => setNameEmployee(e.target.value);

const handlePeriodeNotification = (e) => setPeriodeNotification(e.target.value);

const handleType = (e) => setType(e.target.value);

const handleMatriculeEmployee = (e) => setMatriculeEmployee(e.target.value);


const handleMontantE = (e) => setMontantEntrant(e.target.value);

const handleMontantG = (e) => setMontantGlobal(e.target.value);

const handleStatus= (e) => setStatus(e.target.value);

const handleAvis = (e) => setAvis(e.target.value);

const handleDate = (e) => setDateReunion(e.target.value);

const handleEmail = (e) => {
  const emailList = e.target.value.split(',').map(email => email.trim());
  setEmails(emailList);
}

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
          setStatus(response.data.status);
          setAvis(response.data.avis);
          setDateReunion(formattedDateReunion);
          setPeriodeNotification(response.data.periodeNotification);
          setPlant(response.data.plant);
          setMontantGlobal(response.data.montantGlobal);
          setMontantEntrant(response.data.montantEntrant);
         
         
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
function saveOrUpdateAffaire(e) {
  e.preventDefault();
  if (validateForm()) {
    const formattedDateReunion = formatDate(dateReunion);
      const affaire = {nameAvocat,nameEmployee,matriculeEmployee,typeAffaire,status,avis,dateReunion: formattedDateReunion,periodeNotification,plant,montantGlobal,montantEntrant,emails};
     
      if(id){
        updateAffaire(id,affaire)
        .then((response) => {
            console.log(response.data);
            if (val==="legaLlegal"){
              navigator(`/liste/legaLlegal/${typeAffairee}`);
              }
              else if(val=="Clôture"){
                navigator("/finance")
              }
            else
            navigator(`/liste/legalrh//${typeAffairee}`);
        })
        .catch((error) => {
            console.log(error);
        });
    }
     else{

      const status="En cours de validation"
     
      const affaire = {nameAvocat,nameEmployee,matriculeEmployee,typeAffaire,status,avis,dateReunion: formattedDateReunion,periodeNotification,plant,montantGlobal,montantEntrant,emails};
      console.log(affaire)
      addAffaire(affaire)
      
      .then((response) => {
       
          console.log(response.data);
          const formdata = new FormData();
          formdata.append("to", DIRECTOR_EMAIL);
          formdata.append("cc", "");
          formdata.append("subject", "the subject");
          formdata.append("link", `http://localhost:5173/affair/${response.data}`);
          formdata.append("firstName", "Rouis");
          formdata.append("lastName", "Leoni");
          axios.post("http://localhost:3020/mail/notification", formdata).then((res) =>{}
            ).catch()
            if (val==="legaLlegal"){
              navigator(`/legaLlegal/${val}`);
              }
              else
              navigator(`/legalrh/${val}`);
      })
      
      .catch((error) => {
          console.log(error);
      }); }
     
      
       
      
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
function financeMontant(){
if(status==="ClôtureAvecFinance")return <>     <div className="inputs">
<input type="number" placeholder='Entrer un Montant Global' value={montantGlobal} onChange={handleMontantG}></input>
</div>
<div className="inputs">
<input type="number" placeholder='Entrer un Montant Entrant'value={montantEntrant} onChange={handleMontantE}></input>
</div></>
else return <></>
}
function AffaireType(){
  if(val==="legaLlegal"){
    return       <div className='inputs'>
    <select className="custom-select" name='typeAffaire' value={typeAffaire} onChange={handleType}>
    <option value="">Choisir votre Type</option>
      <option value="Problémes commerciaux">Affaire Commerciaux القضايا التجارية </option>
      <option value="Problémes civiles">Affaire Civiles القضايا المدنية</option>
      <option value="Problémes criminelles">Affaire Criminelles القضايا الجزائية</option>
      <option value="Objections administratives">Objections Administratives  الإعتراضات الإدارية</option>
      <option value="Correspondance administratives legal">Correspondance administratives المراسلات الإدارية</option>
      <option value="Risque">Risque المخاطر</option>
      <option value="Conseils juridique legal">Conseils juridique الإستشارات القانونية</option>
    </select>
  </div>
  
  }
  else return      <div className='inputs'>
  <select className="custom-select" name='typeAffaire' value={typeAffaire} onChange={handleType}>
  <option value="">Choisir votre Type</option>
<option value="Problémes de travail">Problémes de travail القضاياالشغلية</option>
<option value="Affectation au salaire">Affectation au salaire الإحالة على المرتب</option>
<option value="Inspection du travail">Inspection du travail تفقدية الشغل</option>
<option value="Correspondance administratives Rh">Correspondance administratives المراسلات الإدارية</option>
<option value="Conseils juridique Rh">Conseils juridique الإستشارات القانونية</option>

</select>
  </div>
}

function statuss() {
  
  if (id) {
    return (
      <div className="inputs">
        
        <select className="custom-select" name='statusAffaire' value={status} onChange={handleStatus}>
        <option value="">Choisir votre Status</option>
          <option value="صلحي">صلحي</option>
          <optgroup label="قضائي">
             <option value="إبتدائي">إبتدائي</option>
              <option value="استئنافي">استئنافي </option>
                <option value="تعقيب"> تعقيب</option>
            
            
          </optgroup>
          <option value="ClôtureAvecFinance">ClôtureAvecFinance</option>
          <option value="Clôture">Clôture</option>
        </select>
      </div>
    );
  } else {
    return <div>{AffaireType()}</div>;
  }
}



function Choixplant(){
  if (id) return <div>  <div className="inputs">
  <input type="number"  placeholder='Entrer un periode de notification' name="periodeNotification" value={periodeNotification} onChange={handlePeriodeNotification}></input>
  </div>

      <div className="inputs">  <input
        type="text"
        name="emails"
        placeholder='Email pour notification '
        value={emails.join(', ')} // Join emails with comma for display
        onChange={handleEmail}
      /></div></div>
  else return    <div className="inputs">

  <select className="custom-select" name='plant' value={plant} onChange={handlePlant}>
      <option value="">Choisir votre Plant</option>
      <option value="MH1">MH1</option>
      <option value="MH2"> MH2</option>
      <option value="AUDI">AUDI</option>
      <option value="OEM"> OEM</option>
      <option value="BMW">BMW</option>
      <option value="VW"> VW</option>
      <option value="autre"> Autre</option>
      </select>
  </div>} 
   function title(){
    if(id) return <h1 className="card-title">Modiffier Affaire</h1>
    else return <h1 className="card-title">Ajouter Affaire</h1>
   }
   function description(){
  
    if(id) return <div></div>
    else return  <div className="inputs">
    <textarea rows="4" cols="30" name="avis" value={avis} onChange={handleAvis}></textarea>
    </div>
   }
  return (
    <Layout>
      <div className="card"  >
        {title()}
     <form className='FormAffaire'>
      <div className='inputs'>
        <input type="text" placeholder="Entrer un nom-prenom d'Avocat" name="nameAvocat" value={nameAvocat} onChange={handleNameAvocat}></input>
        {errors.nameAvocat && <div className="invalid-feedback" >{errors.nameAvocat}</div>}
      </div>
      <div className='inputs'>
        <input type="text" placeholder="Entrer un nom-prenom d'Client" name="nameEmployee" value={nameEmployee} onChange={handleNameEmployee}></input>
        {errors.nameEmployee && <div className="invalid-feedback">{errors.nameEmployee}</div>}
      </div>
     

      <div className="inputs">
      <input type="number" placeholder='Entrer un matriculeClient' name="matriculeEmployee" value={matriculeEmployee} onChange={handleMatriculeEmployee}></input>
      </div>
      <div className="inputs">
      <input type="date" placeholder='Enter a date' name="dateReunion" value={dateReunion} onChange={handleDate}></input>
        {errors.dateReunion && <div className="invalid-feedback">{errors.dateReunion}</div>}
      </div>
 
     {statuss()}
{financeMontant()}
 
    {description()}
    
      {Choixplant()}
      
      <button className="btn btn-primary" onClick={saveOrUpdateAffaire}>Ajouter</button>
     </form>
   </div>
  
  </Layout>
  )
}

export default Affaire