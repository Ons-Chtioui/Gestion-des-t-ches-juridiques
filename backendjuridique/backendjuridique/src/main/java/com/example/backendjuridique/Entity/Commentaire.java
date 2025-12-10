package com.example.backendjuridique.Entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Data 
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Commentaire {
  public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Affaire getAffaire() {
		return affaire;
	}
	public void setAffaire(Affaire affaire) {
		this.affaire = affaire;
	}
	public String getContenu() {
		return contenu;
	}
	public void setContenu(String contenu) {
		this.contenu = contenu;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date dateCreation) {
		this.dateCreation = dateCreation;
	}
@Id
  @GeneratedValue(strategy= GenerationType.IDENTITY)
  private Long id;
  
@ManyToOne
@JoinColumn(name = "affaire_id")
private Affaire affaire;

@Column(name = "contenu", length = 5000)
private String contenu;

@Column(name = "date_creation")
private Date dateCreation;

public Commentaire(Long id, Affaire affaire, String contenu, Date dateCreation) {
	
	this.id = id;
	this.affaire = affaire;
	this.contenu = contenu;
	this.dateCreation = dateCreation;
}
public Commentaire(){}
  
}
