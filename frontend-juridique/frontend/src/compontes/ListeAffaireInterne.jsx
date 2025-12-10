import React from 'react'
import { Link } from 'react-router-dom';
import './ListeAffaire.css'
import  { useEffect, useState } from 'react'
import {getAffaireInternByType} from './UtilisateurService'
import {useNavigate, useParams} from "react-router-dom";
import Layout from './Layout';
import { useAuth } from './useAuth';
import Admin from './Admin';
const ListeAffaire = () => {
    const navigator =useNavigate();
    const [affaires,setaffaires]=useState([])
  const{user}=useAuth()
    
  function formatDate(rawDate) {
    const dateObj = new Date(rawDate);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  }
    useEffect(()=>{
        getAffaire()
    
       },[])
       const {typeAffaire} = useParams();
       console.log(typeAffaire)
      function getAffaire(){
      
        getAffaireInternByType(typeAffaire).then((response)=>{
          setaffaires(response.data);
          
      }).catch(error=>{
          console.log(error)
      })
       }
      function update(id){
        navigator(`/edit-affaireinterne/${typeAffaire}/${id}`)}
        
        function formatDate(rawDate) {
          const dateObj = new Date(rawDate);
          const year = dateObj.getFullYear();
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        }
        
        function  moveToAffaireinterne(){
            if(typeAffaire==="CCL")
        navigator(`/affairinterne/${typeAffaire}`)
           else
           navigator(`/affairinterne/${typeAffaire}`)
              }
      function tabelType(){
        if(typeAffaire==="CCL") return  <table className='table table-striped table-bordered'>
        <thead>
            <tr>
             
                <th>Nom-Prénom</th>
                <th>MatriculeClient</th>
                <th>Année</th>
                 <th>Ancienne</th>
                <th>Raison</th>
                <th>Status</th>
                <th>Action</th>
                <th></th>
              
            </tr>
        </thead>
        <tbody>
        {affaires.map(affaire =>
<tr key={affaire.id}>

<td>{affaire.name}</td>

<td>{affaire.matricule}</td>

<td>{affaire.année}</td>
<td>{affaire.ancienne}</td>
<td>{affaire.raison}</td>
<td>{affaire.probleme}</td>

<td>
<button key={affaire.id} className='btn btn-info' onClick={() => update(affaire.id)}>
                                      Modifier
                                    </button>
                                    
</td>
<td>
            <Link to={`/affaireInterne/${affaire.id}`} className="btn btn-primary">Voir les fichiers</Link>
         

          </td>
</tr>
)}

        </tbody>
    </table>

      else return  <table className='table table-striped table-bordered'>
      <thead>
          <tr>
           
              <th>Nom-Prénom</th>
                <th>MatriculeClient</th>
               <th>Problème</th>
              <th>Questionneur</th>
              <th>Date d'Embouche</th>
              <th>Action</th>
              <th></th>
            
          </tr>
      </thead>
      <tbody>
      {affaires.map(affaire =>
<tr key={affaire.id}>

<td>{affaire.name}</td>
<td>{affaire.matricule}</td>
<td>{affaire.probleme}</td>
<td>{affaire.questionair}</td>
<td>{formatDate(affaire.dateEmbouche)}</td>
<td>
<button key={affaire.id} className='btn btn-info' onClick={() => update(affaire.id)}>
                                    Modifier
                                  </button>
</td>
<td>
          <Link to={`/affaireInterne/${affaire.id}`} className="btn btn-primary">Voir les fichiers</Link>
       

        </td>
</tr>
)}

      </tbody>
  </table>  
      }
  return (
    <Layout>
    <div>
    {tabelType()}
    {user.userType==="Admin" ? null:<button className='ajouteraffair' onClick={moveToAffaireinterne}>+</button>}
    

    </div> </Layout>
  )
}

export default ListeAffaire