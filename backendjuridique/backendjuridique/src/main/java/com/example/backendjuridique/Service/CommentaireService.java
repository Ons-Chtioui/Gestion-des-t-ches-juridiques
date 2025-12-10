package com.example.backendjuridique.Service;


import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendjuridique.Entity.Commentaire;
import com.example.backendjuridique.respository.CommentaireRepository;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    public Commentaire createCommentaire(Commentaire commentaire) {
    	commentaire.setDateCreation(new Date());
        return commentaireRepository.save(commentaire);
    }
    
    public Commentaire getCommentaireById(Long id) {
        return commentaireRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Commentaire not found with id: " + id));
    }

    public List<Commentaire> getAllCommentaires() {
        return commentaireRepository.findAll();
    }

    // Ajoutez cette méthode pour récupérer les commentaires par ID d'affaire
    public List<Commentaire> getCommentairesByAffaireId(Long affaireId) {
        return commentaireRepository.findByAffaireId(affaireId);
    }
}
