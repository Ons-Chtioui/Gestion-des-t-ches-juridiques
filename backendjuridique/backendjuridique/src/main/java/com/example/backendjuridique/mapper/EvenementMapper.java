package com.example.backendjuridique.mapper;

import com.example.backendjuridique.Entity.Evenement;
import com.example.backendjuridique.dto.EvenementDto;

public class EvenementMapper {
	 public static EvenementDto mapToEvenementDto(Evenement Evenement) {
		 return new EvenementDto(
				 Evenement.getId(),
				 Evenement.getTitre(),
				 Evenement.getDate(),
				 Evenement.getEmails()
				 );
	 }
	 public static Evenement mapToEvenement(EvenementDto EvenementDto) {
		 return new Evenement(
				 EvenementDto.getId(),
				 EvenementDto.getTitre(),
				 EvenementDto.getDate(),
				 EvenementDto.getEmails()
				
				 );
	 }

}
