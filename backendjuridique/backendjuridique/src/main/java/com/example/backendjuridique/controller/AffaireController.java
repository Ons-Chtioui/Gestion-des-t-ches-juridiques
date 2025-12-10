package com.example.backendjuridique.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.Sevice.impl.AffaireServiceImpl;
import com.example.backendjuridique.dto.AffaireDto;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AffaireController {


	@Autowired 
	private AffaireServiceImpl affaireService;
	

	@PostMapping("/api/affaire/save")
    public ResponseEntity<Long> saveAffaire(@RequestBody AffaireDto affaireDto) {
        Long id = affaireService.addAffaire(affaireDto);
        return new ResponseEntity<>(id, HttpStatus.CREATED);
    }
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("/api/affaire/get/{id}")
	public ResponseEntity<AffaireDto> getAffaireById(@PathVariable("id") Long affaireId){
		
       AffaireDto affaireDto = affaireService.getAffaireById( affaireId);
        return  ResponseEntity.ok(affaireDto);
}
	@GetMapping("/api/affaire")
	public ResponseEntity<List<AffaireDto>> getAllAffaires(){
		
		List<AffaireDto> affaireDto=affaireService.getAllAffaires();
		
		return ResponseEntity.ok(affaireDto);
	}
	@PutMapping("/api/affaire/{id}")
public ResponseEntity<AffaireDto> updatedAffaire( @RequestBody AffaireDto updatedAffaire,@PathVariable("id")Long affaireId){
		
	AffaireDto affaireDto = affaireService.updatedAffaire(updatedAffaire, affaireId);
        return  ResponseEntity.ok(affaireDto);
        }
	@GetMapping("/api/affaire/type/{typeAffaire}")
	public ResponseEntity<List<AffaireDto>> getAffaireByType(@PathVariable("typeAffaire") String typeAffaire){
		
       List<AffaireDto> affaireDto = affaireService.getAffaireByType(typeAffaire);
        return  ResponseEntity.ok(affaireDto);
}
	@GetMapping("/api/affaire/status/{status}")
	public ResponseEntity<List<AffaireDto>> getAffaireByStatus(@PathVariable("status") String status){
		
       List<AffaireDto> affaireDto = affaireService.getAffaireByStatus(status);
        return  ResponseEntity.ok(affaireDto);
}
	@DeleteMapping("/delete-all")
    public String deleteAllData() {
       affaireService.supprimerToutesLesDonnees(); // Appelez la méthode dans votre service
        return "Toutes les données ont été supprimées avec succès.";
    }
}
