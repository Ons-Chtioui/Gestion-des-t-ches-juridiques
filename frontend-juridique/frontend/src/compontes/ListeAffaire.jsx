import React from 'react'
import { Link } from 'react-router-dom';
import './ListeAffaire.css'
import  { useEffect, useState } from 'react'
import { getAllAffaire,getAffaireByType} from './UtilisateurService'
import {useNavigate, useParams} from "react-router-dom";
import Layout from './Layout';
const ListeAffaire = () => {
    const navigator =useNavigate();
    const [affaires,setaffaires]=useState([])
    const {val} =useParams()
    useEffect(()=>{
        getAffaire()
    
       },[])
       const {typeAffairee} = useParams();
       
      function getAffaire(){
        getAffaireByType(typeAffairee).then((response)=>{
          setaffaires(response.data);
          
      }).catch(error=>{
          console.log(error)
      })
       }
      function update(id){
        navigator(`/edit-affaire/${val}/${typeAffairee}/${id}`)}
        
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
                 
                    <th>NomAvocat</th>
                    <th>NomClient</th>
                    <th>MatriculeClient</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Date de Creation</th>
                    <th>Plant</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  
                </tr>
            </thead>
            <tbody>
            
            {affaires.slice().reverse().map(affaire =>
  <tr key={affaire.id}>
   
    <td>{affaire.nameAvocat}</td>
    <td>{affaire.nameEmployee}</td>
    <td>{affaire.matriculeEmployee}</td>
    <td>{affaire.avis}</td>
  
    <td>{formatDate(affaire.dateReunion)}</td>
    <td>{formatDate(affaire.dateCreation)}</td>
    <td>{affaire.plant}</td>
    <td>  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      affaire.status === 'En cours de validation' 
                        ? 'bg-success text-success'
                        :affaire.status === 'refuse'
                        ? 'bg-danger text-danger'
                        :affaire.status === 'صلحي'
                        ? 'bg-warning text-warning'
                       : affaire.status === 'إبتدائي' 
                       ? 'bg-primary text-primary' 
                        : 'bg-warning text-warning'
                    }`}
                  > { affaire.status}
               
                  </p></td>
    <td>
    {affaire.status !== "En cours de validation" && affaire.status !== "refuse" && (
    <button key={affaire.id} className='btn btn-info' onClick={() => update(affaire.id)}>
        Modifier
    </button>
)}

    </td>
    <td>
                <Link to={`/affaire/${affaire.id}`} className="btn btn-primary">Voir les fichiers</Link>
             
                <Link to={`/commaintaire/${affaire.id}`} className="btn btn-primary">Voir les  Commentaires</Link>
              </td>
  </tr>
)}

            </tbody>
        </table>
    </div> </Layout>
  )
}

export default ListeAffaire