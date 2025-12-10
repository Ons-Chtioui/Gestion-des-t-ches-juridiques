import { RiDeleteBinLine } from 'react-icons/ri'; // Import de l'icône de suppression depuis React Icons
import { RiRefreshLine } from 'react-icons/ri'; // Import de l'icône de mise à jour depuis React Icons
import { RiEditLine } from 'react-icons/ri';

import './Admin.css';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listUtilisateurs, deleteUtilisateur,getAffaireByStatus} from './UtilisateurService';
import Navbar from './NavBar';

import axios from 'axios';
import loi from"./loi.png";
import CardDataStats from './CardDataStats';
import Header from './Header';
import Layout from './Layout';


const Admin = () => {
  const navigator =useNavigate();
  const [utilisateurs,setutilisateurs]=useState([])

  function  CreerCompte(){
    navigator('/signup')
  }

  const [affaireCounts, setAffaireCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appel à l'API pour récupérer les données d'affaires pour chaque statut
        const affairePromises = [
          getAffaireByStatus('صلحي'),
          getAffaireByStatus('إبتدائي'),
          getAffaireByStatus('استئنافي'),
          getAffaireByStatus('تعقيب'),
          getAffaireByStatus('ClôtureAvecFinance'),
          getAffaireByStatus('Clôture'),
          getAffaireByStatus('Validé'),
          getAffaireByStatus('Refusé'),
          getAffaireByStatus('En cours de validation')
        ];

        // Résoudre toutes les promesses en parallèle
        const affairesResponses = await Promise.all(affairePromises);

        // Créer un objet pour stocker les nombres d'affaires par statut
        const counts = {};

        // Spécialiser les données d'affaires en fonction de chaque statut
        affairesResponses.forEach((response, index) => {
          counts[index] = response.data.length;
        });

        // Mettre à jour l'état avec les nombres d'affaires par statut
        setAffaireCounts(counts);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'affaires:', error);
      }
    };

    fetchData();
  }, []); // Appel de useEffect une seule fois lors du montage du composant

  
  function  moveToLegal(){
   const val="legaLlegal"
   navigator(`/legallegal/${val}`);
  }
  function  moveToLegalRh(){
    const val="legalrh"
    navigator(`/legalrh/${val}`);
  }


  
 function movetostat(){
  navigator('/statFinance')
 }

  useEffect(()=>{
    getAllUtilisateurs()

   },[])
  function getAllUtilisateurs(){
    listUtilisateurs().then((response)=>{
      setutilisateurs(response.data);
  }).catch(error=>{
      console.log(error)
  })
   }

   function updateUtilisateur(id){
    navigator(`/edit-utilisateur/${id}`)
  }
 
  function moveToListPlant(){
    navigator('/plant')
  }
  function removeUtilisateur(id){
    console.log(id)
    deleteUtilisateur(id).then((response)=>{
     getAllUtilisateurs();
    }).catch(error=>{
     console.log(error)
    })
   }
  return ( 
    <Layout>

   <div className='home'> 
   <div class="col row-cols-2 row-cols-md-3 g-4 g-md-6" id="card"> <div class="row">
    <CardDataStats title="صلحي" levelUp affaireCount={affaireCounts[0]}>
    </CardDataStats>
  </div>
  <div class="row">
    <CardDataStats title="إبتدائي" levelUp affaireCount={affaireCounts[1]}>
    </CardDataStats>
  </div>
  <div class="row">
    <CardDataStats title="استئنافي " levelUp affaireCount={affaireCounts[2]}>
    </CardDataStats>
  </div>
  <div class="row">
    <CardDataStats title="تعقيب" levelUp affaireCount={affaireCounts[3]}>
    </CardDataStats>
  </div>
  <div class="row">
    <CardDataStats title="Clôture" levelUp affaireCount={affaireCounts[5]}>
    </CardDataStats>
  </div>
  <div class="row">
    <CardDataStats title="ClôtureAvecFinance" levelUp affaireCount={affaireCounts[4]}>
    </CardDataStats>
  </div>
</div>


      
      <div className="equipe-legal">
        <h2>EQUIPE LEGAL</h2>
        <table id='table'  className="table table-bordered">
            <thead className="table-light">
                <tr>
                  
                    <th>Nom </th>
                    <th> Email</th>
                     <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {
                  utilisateurs.map(utilisateur=>
                      <tr key={utilisateur.id}>
                        
                        <td>{utilisateur.name}</td>
                        <td>{utilisateur.email}</td>
                        <td>{utilisateur.type}</td>
                     
               <td> 
                  <button  className='btn btn-info' onClick={() =>updateUtilisateur(utilisateur.id)} ><RiEditLine /></button>
                  <button className='btn btn-danger' onClick={()=>removeUtilisateur(utilisateur.id)}>  <RiDeleteBinLine /></button>
                 </td>
                 </tr>)}
            </tbody>
        </table>
      </div>
      
      
    </div>
    </Layout>
  )
}

export default Admin