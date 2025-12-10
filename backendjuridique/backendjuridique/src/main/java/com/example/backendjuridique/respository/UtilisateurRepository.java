package com.example.backendjuridique.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import com.example.backendjuridique.Entity.Utilisateur;
 
@Repository
@EnableJpaRepositories
public interface UtilisateurRepository extends JpaRepository<Utilisateur,Long>  {
	 Optional<Utilisateur> findOneByEmailAndPassword(String email, String password);
	    Utilisateur findByEmail(String email);
}
