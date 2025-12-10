package com.example.backendjuridique.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.dto.AffaireDto;


@Service
public interface AffaireService {
    
	Long addAffaire(AffaireDto affaireDto);
	
	AffaireDto updatedAffaire(AffaireDto updatedAffaire,Long affaireId);
	
	AffaireDto getAffaireById(Long affaireId);
	
	 List<AffaireDto> getAllAffaires();
	 
	 List<AffaireDto> getAffaireByType(String Type);
	 
	 List<AffaireDto> getAffaireByStatus(String Status);

	
	
	
}
