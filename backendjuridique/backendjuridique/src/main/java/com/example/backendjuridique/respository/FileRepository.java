package com.example.backendjuridique.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backendjuridique.Entity.File;
@Repository
public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findByAffaireId(Long affaireId);
}


