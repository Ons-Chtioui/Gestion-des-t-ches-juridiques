package com.example.backendjuridique.Sevice.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import com.example.backendjuridique.Entity.Utilisateur;
import com.example.backendjuridique.Service.UtilisateurService;
import com.example.backendjuridique.dto.LoginDto;
import com.example.backendjuridique.dto.UtilisateurDto;
import com.example.backendjuridique.exception.ResourceNotFoundException;
import com.example.backendjuridique.mapper.UtilisateurMapper;
import com.example.backendjuridique.response.LoginResponse;
import com.example.backendjuridique.respository.UtilisateurRepository;

import lombok.AllArgsConstructor;


@Service
@AllArgsConstructor
public class UtilisateurServiceImpl implements UtilisateurService{
	@Autowired
private UtilisateurRepository utilisateurRepository;
	@Autowired
private PasswordEncoder passwordEncoder;

	@Override
	public String addUtilisateur(UtilisateurDto utilisateurDto) {
		Utilisateur utilisateur=new Utilisateur(
				 utilisateurDto.getId(),
				 utilisateurDto.getName(),
				 utilisateurDto.getEmail(),
				 utilisateurDto.getMatricule(),
				 utilisateurDto.getNum(),
				 utilisateurDto.getType(),
				 this.passwordEncoder.encode(utilisateurDto.getPassword())
				 );
		utilisateurRepository.save(utilisateur);
		
		return utilisateur.getName();
	}

	@Override
	public LoginResponse loginUtilisateur(LoginDto loginDTO) {
		String msg = "";
        Utilisateur utilisateur1 = utilisateurRepository.findByEmail(loginDTO.getEmail());
        if ( utilisateur1 != null) {
            String password = loginDTO.getPassword();
            String encodedPassword =  utilisateur1.getPassword();
            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Utilisateur> utilisateur = utilisateurRepository.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
                if (utilisateur.isPresent()) {
                	 String typeUtilisateur = utilisateur.get().getType();     
                	 String name = utilisateur.get().getName();     
                    return new LoginResponse("Login Success", true,typeUtilisateur,name);
                } else {
                    return new  LoginResponse("Login Failed", false);
                }
            } else {
                return new  LoginResponse("password Not Match", false);
            }
        }else {
            return new  LoginResponse("Email not exits", false);
        }
    }

	@Override
	public UtilisateurDto getUtilisateurById(Long utilisateurId) {
		Utilisateur utilisateur=utilisateurRepository.findById(utilisateurId)
				.orElseThrow(()->
				  new ResourceNotFoundException("Utilisateur is not exist with given id :" + utilisateurId));
		return UtilisateurMapper.mapToUtilisateurDto(utilisateur);
	}

	@Override
	public List<UtilisateurDto> getAllUtilisateurs() {
		List<Utilisateur> utilisateurss=utilisateurRepository.findAll();
		return utilisateurss.stream().map((utilisateur)->UtilisateurMapper.mapToUtilisateurDto(utilisateur))
                 .collect(Collectors.toList());
	}

	@Override
	public UtilisateurDto updatedUtilisateur(Long utilisateurId, UtilisateurDto updatedUtilisateur) {
		Utilisateur utilisateur=utilisateurRepository.findById(utilisateurId).orElseThrow(()->
				  new ResourceNotFoundException("Utilisateur is not exist with given id :" + utilisateurId));
		utilisateur.setName(updatedUtilisateur.getName());
		utilisateur.setEmail(updatedUtilisateur.getEmail());
		utilisateur.setMatricule(updatedUtilisateur.getMatricule());
		utilisateur.setNum(updatedUtilisateur.getNum());
		utilisateur.setType(updatedUtilisateur.getType());
		utilisateur.setPassword(this.passwordEncoder.encode(updatedUtilisateur.getPassword())
				 );
		Utilisateur updatedUtilisateurObj=utilisateurRepository.save(utilisateur);
		return UtilisateurMapper.mapToUtilisateurDto(updatedUtilisateurObj);
	}

	@Override
	public void deleteUtilisateur(Long utilisateurId) {
		Utilisateur utilisateur=utilisateurRepository.findById(utilisateurId).orElseThrow(()->
		  new ResourceNotFoundException("Utilisateur is not exist with given id :" + utilisateurId));
           
		utilisateurRepository.deleteById(utilisateurId);
		
		
	}

	
}
