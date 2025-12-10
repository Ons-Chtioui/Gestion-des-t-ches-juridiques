package com.example.backendjuridique.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backendjuridique.dto.LoginDto;
import com.example.backendjuridique.dto.UtilisateurDto;
import com.example.backendjuridique.response.LoginResponse;


@Service
public interface UtilisateurService {
	
     String addUtilisateur(UtilisateurDto utilisateurDto);
     
      LoginResponse loginUtilisateur(LoginDto loginDto);
     
     UtilisateurDto getUtilisateurById(Long utilisateurId);
     
     List<UtilisateurDto> getAllUtilisateurs();
   
     UtilisateurDto updatedUtilisateur(Long id,UtilisateurDto updateUtilisateur);

     void deleteUtilisateur(Long utilisateurId); 
}
