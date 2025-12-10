import React from 'react'
import './ListeAffaire.css'
import  { useEffect, useState } from 'react'
import { getAffaireByStatus} from './UtilisateurService'
import {useNavigate, useParams} from "react-router-dom";
import Layout from './Layout';
const ListeAffaireStatus = () => {
    const navigator =useNavigate();
    const [affaires,setaffaires]=useState([])
    useEffect(()=>{
        getAffaire()
    
       },[])
       const status= "ClôtureAvecFinance";
       
      function getAffaire(){
        getAffaireByStatus(status).then((response)=>{
          setaffaires(response.data);
          
      }).catch(error=>{
          console.log(error)
      })
       }
      function update(id){
        const val="Clôture"
        navigator(`/edit-affaire/${val}/${id}`)}
        
        function formatDate(rawDate) {
          const dateObj = new Date(rawDate);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        }
        
  return (
    <Layout>
    <div>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>NomAvocat</th>
                    <th>NomClient</th>
                    <th>MatriculeClient</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Date de Creation</th>
                    <th>Plant</th>
                    <th>Status</th>
                    <th>Montant Global</th>
                    <th>Montant Entrant</th>
                    <th>Action</th>
                  
                </tr>
            </thead>
            <tbody>
            {affaires.map(affaire =>
  <tr key={affaire.id}>
    <td>{affaire.id}</td>
    <td>{affaire.nameAvocat}</td>
    <td>{affaire.nameEmployee}</td>
    <td>{affaire.matriculeEmployee}</td>
    <td>{affaire.typeAffaire}</td>
    <td>{formatDate(affaire.dateCreation)}</td>
    <td>{formatDate(affaire.dateReunion)}</td>
    <td>{affaire.plant}</td>
    <td>{affaire.status}</td>
    <td>{affaire.montantGlobal}</td>
     <td>{affaire.montantEntrant}</td>
    <td>
      <button className='btn btn-info' onClick={() => update(affaire.id)}>Modifier</button>
    </td>
  </tr>
)}

            </tbody>
        </table>
    </div>
    </Layout>
  )
}

export default ListeAffaireStatus