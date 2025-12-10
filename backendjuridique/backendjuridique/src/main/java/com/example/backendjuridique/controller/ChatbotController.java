package com.example.backendjuridique.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.backendjuridique.response.ChatbotResponse;
import com.example.backendjuridique.response.ChatbotRequest;
import com.example.backendjuridique.respository.AffaireRepository;
import com.example.backendjuridique.Entity.Affaire;


@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class ChatbotController {

    @Autowired
    private AffaireRepository affaireRepository;

    @PostMapping("/chatbot")
    public ResponseEntity<ChatbotResponse> answerQuestion(@RequestBody ChatbotRequest request) {
        String question = request.getQuestion();
        // Recherche de la réponse dans la table "Affaire"
        String answer = findAnswerInAffaires(question);
        // Répondre avec la réponse trouvée
        return ResponseEntity.ok(new ChatbotResponse(answer));
    }

    private String findAnswerInAffaires(String typeAffaire) {
        List<Affaire> affaires = affaireRepository.findByTypeAffaireIgnoreCase(typeAffaire);
        if (!affaires.isEmpty()) {
            StringBuilder response = new StringBuilder("Les employés pour le type d'affaire '").append(typeAffaire).append("' sont : ");
            for (Affaire affaire : affaires) {
                response.append(affaire.getNameEmployee()).append(", ");
            }
            response.setLength(response.length() - 2); // Supprimer la dernière virgule
            return response.toString();
        } else {
            return "Aucun employé correspondant pour le type d'affaire '" + typeAffaire + "' n'a été trouvé.";
        }
    }
}

