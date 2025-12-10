package com.example.backendjuridique.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backendjuridique.Entity.Commentaire;

public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {

    // Déclarez ici votre méthode pour récupérer les commentaires par ID d'affaire
    List<Commentaire> findByAffaireId(Long affaireId);
}
