import React, { ReactNode } from 'react';

interface CardDataStatsProps {
  title: string;

  
  affaireCount: number; // Nouvelle propriété pour le nombre d'affaires
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,

  affaireCount, // Nouvelle propriété pour le nombre d'affaires
  
}) => {
  return (
    <div className="border  rounded-sm bg-white py-3 px-4 shadow" style={{ width: "250px" }}>
    
  
    <div > {/* Centrage du contenu */}
      <h5 className="card-title" style={{ color:'#C7794B',display:'flex',justifyContent:'end'}}>{title}</h5>
      <p className="text-sm font-weight-bold" style={{marginTop:'10px' }} >Nombre d'affaires : {affaireCount}</p>
    </div>
</div>

  
     
  );
};

export default CardDataStats;
