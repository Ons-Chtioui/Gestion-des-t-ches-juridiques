package com.example.backendjuridique.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backendjuridique.dto.EvenementDto;
@Service
public interface EvenementService {
   
    Long addEvenement(EvenementDto EvenementDto);
	
	EvenementDto updatedEvenement(EvenementDto updatedEvenement,Long EvenementId);
	
	EvenementDto getEvenementById(Long EvenementId);
	
	 List<EvenementDto> getAllEvenements();
	 
	 void deleteEvenement(Long EvenementId); 
	 
} 
