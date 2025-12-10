package com.example.backendjuridique.Sevice.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendjuridique.Entity.Evenement;

import com.example.backendjuridique.Service.EvenementService;
import com.example.backendjuridique.dto.EvenementDto;
import com.example.backendjuridique.exception.ResourceNotFoundException;
import com.example.backendjuridique.mapper.EvenementMapper;

import com.example.backendjuridique.respository.EvenementRepository;
@Service
public class EvenementServiceImpl  implements EvenementService{
	@Autowired
	private EvenementRepository EvenementRepository;
	@Override
	public Long addEvenement(EvenementDto EvenementDto) {
			Evenement Evenement= EvenementMapper.mapToEvenement(EvenementDto);
		    
			EvenementRepository.save(Evenement);
			return Evenement.getId();
	}

	@Override
	public EvenementDto updatedEvenement(EvenementDto updatedEvenement, Long EvenementId) {
    
		Evenement Evenement =EvenementRepository.findById(EvenementId).orElseThrow(()-> 
        new ResourceNotFoundException("Evenement is not exist with given id :" + EvenementId));
		  Evenement.setTitre(updatedEvenement.getTitre());
		  Evenement.setDate(updatedEvenement.getDate());
		 
		  Evenement.setEmails(updatedEvenement.getEmails());
		  
		   Evenement updatedEvenementObj=EvenementRepository.save(Evenement);
		return EvenementMapper.mapToEvenementDto(updatedEvenementObj);
	}

	@Override
	public EvenementDto getEvenementById(Long EvenementId) {

		Evenement Evenement =EvenementRepository.findById(EvenementId)
		    .orElseThrow(()-> 
		         new ResourceNotFoundException("Evenement is not exist with given id :" + EvenementId));
		
		return EvenementMapper.mapToEvenementDto(Evenement);

	}

	@Override
	public List<EvenementDto> getAllEvenements() {
	List<Evenement> Evenements= EvenementRepository.findAll();
		
		return  Evenements.stream().map((Evenement)->EvenementMapper.mapToEvenementDto(Evenement))
				.collect(Collectors.toList());

	}

	@Override
	public void deleteEvenement(Long EvenementId) {
		Evenement Evenement =EvenementRepository.findById(EvenementId).orElseThrow(()-> 
        new ResourceNotFoundException("Evenement is not exist with given id :" + EvenementId));
		EvenementRepository.deleteById(EvenementId);
		
	}

}
