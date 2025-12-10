package com.example.backendjuridique.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backendjuridique.Entity.Evenement;

public interface EvenementRepository  extends JpaRepository<Evenement,Long>{

}
