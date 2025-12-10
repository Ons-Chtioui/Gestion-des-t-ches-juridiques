package com.example.backendjuridique.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendjuridique.Sevice.impl.EvenementServiceImpl;

import com.example.backendjuridique.dto.EvenementDto;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController

@CrossOrigin(origins = "http://localhost:5173")

@RequestMapping("/api/Evenement")

public class EvenementController {

	
	@Autowired 
	private EvenementServiceImpl EvenementService;
 
	
	
	@PostMapping("/add")
	

	public Long saveEvenement(@RequestBody EvenementDto EvenementDto) {
		
	Long id =EvenementService.addEvenement(EvenementDto);
		
		return id;
	}
	
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("{id}")
    public ResponseEntity<EvenementDto> getEvenementById(@PathVariable("id") Long EvenementId){
	   EvenementDto EvenementDto = EvenementService.getEvenementById(EvenementId);
	   return ResponseEntity.ok(EvenementDto);
	
   }
	@GetMapping
	public ResponseEntity<List<EvenementDto>> getAllEvenements(){
		List<EvenementDto> Evenements = EvenementService.getAllEvenements();
		   return ResponseEntity.ok(Evenements);
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("{id}")
    public ResponseEntity<EvenementDto> updatedEvenement(@PathVariable("id") Long EvenementId,@RequestBody EvenementDto updatedEvenement){
	   EvenementDto EvenementDto = EvenementService.updatedEvenement(updatedEvenement,EvenementId);
	   return ResponseEntity.ok(EvenementDto);
	
   }
	@CrossOrigin(origins = "http://localhost:5173")
	@DeleteMapping("{id}")
    public ResponseEntity<String> deleteEvenement(@PathVariable("id") Long EvenementId){
	   EvenementService.deleteEvenement(EvenementId);
	   return ResponseEntity.ok("Evenement deleted successfully!.");
	}
}

