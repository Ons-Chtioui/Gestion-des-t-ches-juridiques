package com.example.backendjuridique.Sevice.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.backendjuridique.Entity.AffaireInterne;
import com.example.backendjuridique.Service.AffaireInterneService;
import com.example.backendjuridique.dto.AffaireInterneDto;
import com.example.backendjuridique.exception.ResourceNotFoundException;
import com.example.backendjuridique.mapper.AffaireInterneMapper;

import com.example.backendjuridique.respository.AffaireInterneRepository;

@Service
public class AffaireInterneServiceImpl  implements AffaireInterneService {

	@Autowired
	private AffaireInterneRepository affaireRepository;
	
	@Override
	public Long addAffaire(AffaireInterneDto affaireDto) {
		AffaireInterne affaire= AffaireInterneMapper.mapToAffaire(affaireDto);
	    
		affaireRepository.save(affaire);
		return affaire.getId();
	}

	@Override
	public AffaireInterneDto updatedAffaire(AffaireInterneDto updatedAffaire, Long affaireId) {
		
			AffaireInterne affaire =affaireRepository.findById(affaireId)
				    .orElseThrow(()-> 
				         new ResourceNotFoundException("Affaire is not exist with given id :" + affaireId));

			  affaire.setName(updatedAffaire.getName());
			  affaire.setDateEmbouche(updatedAffaire.getDateEmbouche());
			  affaire.setProbleme(updatedAffaire.getProbleme());
			  affaire.setRaison(updatedAffaire.getRaison());
			  affaire.setQuestionair(updatedAffaire.getQuestionair());
			  
			   AffaireInterne updatedAffaireObj=affaireRepository.save(affaire);
			return AffaireInterneMapper.mapToAffaireDto(updatedAffaireObj);
		}


	@Override
	public AffaireInterneDto getAffaireById(Long affaireId) {
		AffaireInterne affaire =affaireRepository.findById(affaireId)
			    .orElseThrow(()-> 
			         new ResourceNotFoundException("Affaire is not exist with given id :" + affaireId));
			
			return AffaireInterneMapper.mapToAffaireDto(affaire);
	
	}

	

	public List<AffaireInterneDto> getAffaireByType(String Type) {
		
		List<AffaireInterne> affaires =affaireRepository.findByTypeAffaire(Type);
	    
		return affaires.stream().map((affaire)->AffaireInterneMapper.mapToAffaireDto(affaire))
				.collect(Collectors.toList());
		}
	
  
	
}
