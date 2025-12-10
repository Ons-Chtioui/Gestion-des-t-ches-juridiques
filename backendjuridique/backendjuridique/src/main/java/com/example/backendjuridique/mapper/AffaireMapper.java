package com.example.backendjuridique.mapper;

import com.example.backendjuridique.Entity.Affaire;

import com.example.backendjuridique.dto.AffaireDto;


public class AffaireMapper {
	 public static AffaireDto mapToAffaireDto(Affaire affaire) {
		 return new AffaireDto(
				 affaire.getId(),
				 affaire.getNameAvocat(),
				 affaire.getNameEmployee(),
				 affaire.getMatriculeEmployee(),
				
				 affaire.getTypeAffaire(),
				 affaire.getStatus(),
				 affaire.getDateReunion(),
				 affaire.getAvis(),
				 affaire.getPeriodeNotification(),
				 affaire.getDateCreation(),
				 affaire.getPlant(),
				 affaire.getMontantGlobal(),
				 affaire.getMontantEntrant()
				 );
	 }
	 public static Affaire mapToAffaire(AffaireDto affaireDto) {
		 return new Affaire(
				 affaireDto.getId(),
				 affaireDto.getNameAvocat(),
				 affaireDto.getNameEmployee(),
				 affaireDto.getMatriculeEmployee(),
				
				 affaireDto.getTypeAffaire(),
				 affaireDto.getStatus(),
				 affaireDto.getDateReunion(),
				 affaireDto.getAvis(),
				 affaireDto.getPeriodeNotification(),
				 
				 affaireDto.getDateCreation(),
                 affaireDto.getPlant(),
                 affaireDto.getMontantGlobal(),
				 affaireDto.getMontantEntrant()
				 );
	 }
}
