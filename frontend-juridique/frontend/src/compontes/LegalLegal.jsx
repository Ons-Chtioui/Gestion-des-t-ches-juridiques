import React from 'react'
import './Legallegal.css';
import { useNavigate, useParams } from 'react-router-dom'
import  { useEffect, useState } from 'react'
import loi from"./loi.png";
import justice from"./justice.png";
import juridique from"./droitshumains.png";
import Layout from './Layout';
const LegalLegal  = () => {
    const navigator =useNavigate();
 
    const { val } = useParams();
    
  function  moveToListe(value){
console.log(value)
navigator(`/liste/${val}/${value}`)
  }
  function legal(){
    if(val==="legaLlegal"){
 
      return <div  className="typeAffaire">
  <div className="groupquatre">
<div className="affaire">
<img src={justice }/>
<h3 onClick={() => moveToListe("Problémes Commerciaux")}>Affaire Commerciaux القضايا التجارية  </h3>
<button onClick={() => moveToListe("Problémes Commerciaux")}><strong>En savoir plus</strong></button>
</div>
<div className="affaire" id='Problémes-Civiles'>
<img src={loi}/>
<h3 onClick={() => moveToListe("Problémes Civiles")}>Affaire Civiles القضايا المدنية</h3>
<button onClick={() => moveToListe("Problémes Civiles")}><strong>En savoir plus</strong></button>
</div>
<div className="affaire">
<img src={juridique}/>
<h3 onClick={() => moveToListe("Problémes Criminelles")}>Affaire Criminelles القضايا الجزائية</h3>
<button onClick={() => moveToListe("Problémes Criminelles")}><strong>En savoir plus</strong></button>
</div>
<div className="affaire">
<img src={loi}/>
<h3 onClick={() => moveToListe("Objections Administratives")}>Objections Administratives  الإعتراضات الإدارية</h3>
<button onClick={() => moveToListe("Objections Administratives")}><strong>En savoir plus</strong></button>
</div></div>
<div className="groupeTrois">
<div className="affaire" >
<img src={loi}/>
<h3 onClick={() => moveToListe("Risque")}>Risque المخاطر</h3>
<button onClick={() => moveToListe("Risque")}><strong>En savoir plus</strong></button>
</div>
<div className="affaire" >
<img src={loi}/>
<h3 onClick={() => moveToListe("Conseils juridique legal")}>Conseils juridique الإستشارات القانونية</h3>
<button onClick={() => moveToListe("Conseils juridique legal")}><strong>En savoir plus</strong></button>
</div>
<div className="affaire">
<img src={loi}/>
<h3 onClick={() => moveToListe("Correspondance administratives legal")}>Correspondance administratives المراسلات الإدارية</h3>
<button onClick={() => moveToListe("Correspondance administratives legal")}><strong>En savoir plus</strong></button>
</div></div>
</div>

    }
    else return <div  className="typeAffaire">
      <div className="groupeRtrois">
    <div className="affairerh">
    <img src={loi}/>
 <h3 onClick={() => moveToListe("Problémes de travail")}>Problémes de travail القضاياالشغلية</h3>
 <button onClick={() => moveToListe("Problémes de travail")}><strong>En savoir plus</strong></button>
</div>
<div className="affairerh" id='Affectation au salaire'>
<img src={loi}/>
 <h3 onClick={() => moveToListe("Affectation au salaire")}>Affectation au salaire الإحالة على المرتب</h3>
 <button onClick={() => moveToListe("Affectation au salaire")}><strong>En savoir plus</strong></button>
</div>
<div className="affairerh" id='Inspection du travail'>
<img src={loi}/>
 <h3 onClick={() => moveToListe("Inspection du travail")}>Inspection du travail تفقدية الشغل</h3>
 <button onClick={() => moveToListe("Inspection du travail")}><strong>En savoir plus</strong></button>
</div></div>
<div className="groupeRdeux">
<div className="affairerh" >
<img src={loi}/>
 <h3 onClick={() => moveToListe("Conseils juridique Rh")}>Conseils juridique الإستشارات القانونية</h3>
 <button onClick={() => moveToListe("Conseils juridique Rh")}><strong>En savoir plus</strong></button>
</div>
<div className="affairerh" id='Correspondance-administratives'>
<img src={loi}/>
<h3 onClick={() => moveToListe("Correspondance administratives Rh")}>Correspondance administratives المراسلات الإدارية</h3>
<button onClick={() => moveToListe("Correspondance administratives Rh")}><strong>En savoir plus</strong></button>
</div></div>

</div>
 
      }
  function  moveToAffaire(){
    if(val==="legaLlegal")
navigator(`/ajouteraffaire/${val}`)
   else
   navigator(`/ajouteraffaire/${val}`)
      }
  return (
    <Layout>
   <div>
      
        {legal()}
<button className='ajouteraffair' onClick={moveToAffaire}>+</button>
    </div></Layout>
  )
}



export default LegalLegal