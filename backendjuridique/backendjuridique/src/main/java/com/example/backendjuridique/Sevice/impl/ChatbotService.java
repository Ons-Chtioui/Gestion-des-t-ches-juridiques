package com.example.backendjuridique.Sevice.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backendjuridique.Entity.Affaire;
import com.example.backendjuridique.respository.AffaireRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatbotService {

    @Autowired
    private AffaireRepository affaireRepository;

    public String findAnswerInAffaires(String typeAffaire) {
        // Recherche dans la table "Affaire" par le type d'affaire donné
        List<Affaire> affaires = affaireRepository.findByTypeAffaireIgnoreCase(typeAffaire);

        // Si des affaires correspondantes sont trouvées, récupérez les noms des employés
        if (!affaires.isEmpty()) {
            String nomsEmployes = affaires.stream()
                    .map(Affaire::getNameEmployee)
                    .collect(Collectors.joining(", "));
            return "Les employés pour le type d'affaire '" + typeAffaire + "' sont : " + nomsEmployes;
        }

        // Si aucune affaire n'est trouvée, retournez un message indiquant que le type d'affaire est introuvable
        return "Aucun employé trouvé pour le type d'affaire '" + typeAffaire + "'.";
    }
}

