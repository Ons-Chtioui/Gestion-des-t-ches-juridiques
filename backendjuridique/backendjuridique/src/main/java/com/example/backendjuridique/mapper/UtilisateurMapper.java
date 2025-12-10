package com.example.backendjuridique.mapper;

import com.example.backendjuridique.Entity.Utilisateur;
import com.example.backendjuridique.dto.UtilisateurDto;

public class UtilisateurMapper {
	 public static UtilisateurDto mapToUtilisateurDto(Utilisateur utilisateur) {
		 return new UtilisateurDto(
				 utilisateur.getId(),
				 utilisateur.getName(),
				 utilisateur.getEmail(),
				 utilisateur.getMatricule(),
				 utilisateur.getNum(),
				 utilisateur.getType(),
				 utilisateur.getPassword()
				 );
	 }
	 public static Utilisateur mapToUtilisateur(UtilisateurDto utilisateurDto) {
		 return new Utilisateur(
				 utilisateurDto.getId(),
				 utilisateurDto.getName(),
				 utilisateurDto.getEmail(),
				 utilisateurDto.getMatricule(),
				 utilisateurDto.getNum(),
				 utilisateurDto.getType(),
				 utilisateurDto.getPassword()
				 );
	 }
} 
