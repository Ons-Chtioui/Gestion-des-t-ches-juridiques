package com.example.backendjuridique.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.example.backendjuridique.Entity.Affaire;
@EnableJpaRepositories 
public interface AffaireRepository extends JpaRepository<Affaire,Long>{

	List<Affaire> findByTypeAffaire(String typeAffaire);
	List<Affaire> findByStatus( String status);
	  List<Affaire> findByTypeAffaireIgnoreCase(String typeAffaire);
	void deleteAll();
}
