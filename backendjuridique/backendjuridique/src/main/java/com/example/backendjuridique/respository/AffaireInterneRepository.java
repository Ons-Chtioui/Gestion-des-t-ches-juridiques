package com.example.backendjuridique.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.backendjuridique.Entity.AffaireInterne;

public interface AffaireInterneRepository extends JpaRepository<AffaireInterne,Long> {
	List<AffaireInterne> findByTypeAffaire(String typeAffaire);
}
