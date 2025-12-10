package com.example.backendjuridique.mapper;

import com.example.backendjuridique.Entity.AffaireInterne;

import com.example.backendjuridique.dto.AffaireInterneDto;


public class AffaireInterneMapper {
	 public static AffaireInterneDto mapToAffaireDto(AffaireInterne affaire) {
		 return new AffaireInterneDto(
				 affaire.getId(),
				 affaire.getName(),
				 affaire.getMatricule(),
				 affaire.getTypeAffaire(),
				 affaire.getDateEmbouche(),
				 affaire.getProbleme(),
				 affaire.getRaison(),
				 affaire.getQuestionair(),
				 affaire.getAncienne(),
				 affaire.getAnnée()
				 
				 );
	 }
	 public static AffaireInterne mapToAffaire(AffaireInterneDto affaireDto) {
		 return new AffaireInterne(
				 affaireDto.getId(),
				 affaireDto.getName(),
				 
				 affaireDto.getMatricule(),
				
				 affaireDto.getTypeAffaire(),
				 affaireDto.getDateEmbouche(),
				 affaireDto.getProbleme(),
				 affaireDto.getRaison(),
				 affaireDto.getQuestionair(),
				 affaireDto.getAncienne(),
				 affaireDto.getAnnée()
				 );
	 }
}
