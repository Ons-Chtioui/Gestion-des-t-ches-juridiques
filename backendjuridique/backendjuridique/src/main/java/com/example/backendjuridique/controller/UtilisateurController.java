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

import com.example.backendjuridique.Sevice.impl.UtilisateurServiceImpl;
import com.example.backendjuridique.dto.LoginDto;
import com.example.backendjuridique.dto.UtilisateurDto;
import com.example.backendjuridique.response.LoginResponse;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@CrossOrigin("*")

@RequestMapping("/api/v1/utilisateur")

public class UtilisateurController {

	
	@Autowired 
	private UtilisateurServiceImpl utilisateurService;
 
	
	
	@PostMapping("/save")
	

	public String saveUtilisateur(@RequestBody UtilisateurDto utilisateurDto) {
		
		String id=utilisateurService.addUtilisateur(utilisateurDto);
		
		return id;
	}
	
	@PostMapping("/login")
	
	public ResponseEntity<?> loginUtilisateur(@RequestBody LoginDto loginDto){
		LoginResponse loginResponse =utilisateurService.loginUtilisateur(loginDto);
		return ResponseEntity.ok(loginResponse);
		
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping("{id}")
    public ResponseEntity<UtilisateurDto> getUtilisateurById(@PathVariable("id") Long utilisateurId){
	   UtilisateurDto utilisateurDto = utilisateurService.getUtilisateurById(utilisateurId);
	   return ResponseEntity.ok(utilisateurDto);
	
   }
	@GetMapping
	public ResponseEntity<List<UtilisateurDto>> getAllUtilisateurs(){
		List<UtilisateurDto> utilisateurs = utilisateurService.getAllUtilisateurs();
		   return ResponseEntity.ok(utilisateurs);
		
	}
	@CrossOrigin(origins = "http://localhost:5173")
	@PutMapping("{id}")
    public ResponseEntity<UtilisateurDto> updatedUtilisateur(@PathVariable("id") Long utilisateurId,@RequestBody UtilisateurDto updatedUtilisateur){
	   UtilisateurDto utilisateurDto = utilisateurService.updatedUtilisateur(utilisateurId,updatedUtilisateur);
	   return ResponseEntity.ok(utilisateurDto);
	
   }

	@DeleteMapping("{id}")
    public ResponseEntity<String> deleteUtilisateur(@PathVariable("id") Long utilisateurId){
	   utilisateurService.deleteUtilisateur(utilisateurId);
	   return ResponseEntity.ok("Utilisateur deleted successfully!.");
	}
}

