package com.example.backendjuridique.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendjuridique.Sevice.impl.AffaireInterneServiceImpl;

import com.example.backendjuridique.dto.AffaireInterneDto;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AffaireInterneController {
	
	@Autowired 
	private AffaireInterneServiceImpl affaireService;
	
	@PostMapping("/api/affaireInterne/save")
    public ResponseEntity<Long> saveAffaire(@RequestBody AffaireInterneDto affaireDto) {
        Long id = affaireService.addAffaire(affaireDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }
	
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/api/affaireInterne/get/{id}")
	public ResponseEntity<AffaireInterneDto> getAffaireById(@PathVariable("id") Long affaireId){
		
		AffaireInterneDto affaireDto = affaireService.getAffaireById( affaireId);
        return  ResponseEntity.ok(affaireDto);
}
	@PutMapping("/api/affaireInterne/{id}")
	public ResponseEntity<AffaireInterneDto> updatedAffaire( @RequestBody AffaireInterneDto updatedAffaire,@PathVariable("id")Long affaireId){
			
		AffaireInterneDto affaireDto = affaireService.updatedAffaire(updatedAffaire, affaireId);
	        return  ResponseEntity.ok(affaireDto);
	        }
		@GetMapping("/api/affaireInterne/type/{typeAffaire}")
		public ResponseEntity<List<AffaireInterneDto>> getAffaireByType(@PathVariable("typeAffaire") String typeAffaire){
			
	       List<AffaireInterneDto> affaireDto = affaireService.getAffaireByType(typeAffaire);
	        return  ResponseEntity.ok(affaireDto);
	}

}
