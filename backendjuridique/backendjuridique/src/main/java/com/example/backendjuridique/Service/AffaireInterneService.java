package com.example.backendjuridique.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backendjuridique.dto.AffaireInterneDto;

@Service
public interface AffaireInterneService {

     Long addAffaire(AffaireInterneDto affaireDto);
	
     AffaireInterneDto updatedAffaire(AffaireInterneDto updatedAffaire,Long affaireId);
	
     AffaireInterneDto getAffaireById(Long affaireId);

	 
	 List<AffaireInterneDto> getAffaireByType(String Type);
	 
}
