package com.example.backendjuridique.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backendjuridique.Entity.Affaire;
import com.example.backendjuridique.Entity.Commentaire;
import com.example.backendjuridique.Service.CommentaireService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class CommentaireController {
	@Autowired
    private  CommentaireService commentaireService;
     
	@PostMapping("/commentaires")
	public ResponseEntity<Commentaire> createCommentaire(@RequestBody Commentaire commentaire,
	                                                     @RequestParam("affaireId") Long affaireId) {
	    // Créez une nouvelle instance d'Affaire si elle est null
	    if (commentaire.getAffaire() == null) {
	        commentaire.setAffaire(new Affaire());
	    }
	    
	    // Attribution de l'ID de l'affaire au commentaire
	    commentaire.getAffaire().setId(affaireId);
	    
	    // Enregistrer le commentaire avec le service CommentaireService
	    Commentaire createdCommentaire = commentaireService.createCommentaire(commentaire);
	    
	    return ResponseEntity.status(HttpStatus.CREATED).body(createdCommentaire);
	}


   
    @GetMapping("/commentaires/{id}")
    public ResponseEntity<Commentaire> getCommentaireById(@PathVariable("id") Long id) {
        Optional<Commentaire> optionalCommentaire = Optional.ofNullable(commentaireService.getCommentaireById(id));
        return optionalCommentaire.map(commentaire ->
                ResponseEntity.ok(commentaire))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/commentaires")
    public List<Commentaire> getAllCommentaires() {
        return commentaireService.getAllCommentaires();
    }

    // Ajoutez cette méthode pour récupérer les commentaires par ID d'affaire
    @GetMapping("/commentaires/affaire/{affaireId}")
    public List<Commentaire> getCommentairesByAffaireId(@PathVariable("affaireId") Long affaireId) {
        return commentaireService.getCommentairesByAffaireId(affaireId);
    }
}
