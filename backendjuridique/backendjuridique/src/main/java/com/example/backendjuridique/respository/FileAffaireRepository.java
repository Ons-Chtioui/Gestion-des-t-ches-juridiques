package com.example.backendjuridique.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backendjuridique.Entity.FileAffaire;

public interface FileAffaireRepository extends JpaRepository<FileAffaire, Long> {
    List<FileAffaire> findByAffaireId(Long affaireId); 
    }
