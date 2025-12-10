package com.example.backendjuridique.Sevice.impl;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.Entity.Affaire;
import com.example.backendjuridique.Service.AffaireService;
import com.example.backendjuridique.dto.AffaireDto;
import com.example.backendjuridique.exception.ResourceNotFoundException;
import com.example.backendjuridique.mapper.AffaireMapper;

import com.example.backendjuridique.respository.AffaireRepository;



@Service

public class AffaireServiceImpl  implements AffaireService{
	@Autowired
	private AffaireRepository affaireRepository;
	@Override
	public Long addAffaire(AffaireDto affaireDto) {
		Affaire affaire= AffaireMapper.mapToAffaire(affaireDto);
	    
		affaireRepository.save(affaire);
		return affaire.getId();
	}

	@Override
	public AffaireDto getAffaireById(Long affaireId) {
	
			Affaire affaire =affaireRepository.findById(affaireId)
			    .orElseThrow(()-> 
			         new ResourceNotFoundException("Affaire is not exist with given id :" + affaireId));
			
			return AffaireMapper.mapToAffaireDto(affaire);
	
	}
	 public Date getDateReunionForAffaireId(long id) {
	        Affaire affaire = affaireRepository.findById(id)
	        		.orElseThrow(()-> 
			         new ResourceNotFoundException("Affaire is not exist with given id :" + id));
			
	        
	            return  affaire.getDateReunion();
	            }
	       
	@Override
	public AffaireDto updatedAffaire(AffaireDto updatedAffaire, Long affaireId) {
		Affaire affaire =affaireRepository.findById(affaireId).orElseThrow(()-> 
        new ResourceNotFoundException("Affaire is not exist with given id :" + affaireId));
		  
		  affaire.setNameAvocat(updatedAffaire.getNameAvocat());
		  affaire.setStatus(updatedAffaire.getStatus());
		  affaire.setAvis(updatedAffaire.getAvis());
		  affaire.setDateReunion(updatedAffaire.getDateReunion());
		  affaire.setPeriodeNotification(updatedAffaire.getPeriodeNotification());
		  affaire.setPlant(updatedAffaire.getPlant());
		  affaire.setMontantGlobal(updatedAffaire.getMontantGlobal());
		  affaire.setMontantEntrant(updatedAffaire.getMontantEntrant());
		  
		   Affaire updatedAffaireObj=affaireRepository.save(affaire);
		return AffaireMapper.mapToAffaireDto(updatedAffaireObj);
	}

	@Override
	public List<AffaireDto> getAllAffaires() {

		List<Affaire> affaires= affaireRepository.findAll();
		
		return  affaires.stream().map((affaire)->AffaireMapper.mapToAffaireDto(affaire))
				.collect(Collectors.toList());}

	@Override
	public List<AffaireDto> getAffaireByType(String affaireType) {
		List<Affaire> affaires =affaireRepository.findByTypeAffaire(affaireType);
			    
		return affaires.stream().map((affaire)->AffaireMapper.mapToAffaireDto(affaire))
				.collect(Collectors.toList());}


    public void supprimerToutesLesDonnees() {
        affaireRepository.deleteAll(); // Appel de la méthode pour supprimer toutes les données
    }

	@Override
	public List<AffaireDto> getAffaireByStatus(String Status) {
		List<Affaire> affaires =affaireRepository. findByStatus(Status);
	    
		return affaires.stream().map((affaire)->AffaireMapper.mapToAffaireDto(affaire))
				.collect(Collectors.toList());

	}
}
