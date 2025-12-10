package com.example.backendjuridique.dto;

import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class AffaireInterneDto {
	
	public AffaireInterneDto(Long id, String name, Long matricule, String typeAffaire, Date dateEmbouche, String probleme,
			String raison, String questionair, Long ancienne, Long année) {
		super();
		this.id = id;
		this.name = name;
		this.matricule = matricule;
		this.typeAffaire = typeAffaire;
		this.dateEmbouche = dateEmbouche;
		this.probleme = probleme;
		this.raison = raison;
		this.questionair = questionair;
		this.ancienne = ancienne;
		this.année = année;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getMatricule() {
		return matricule;
	}
	public void setMatricule(Long matricule) {
		this.matricule = matricule;
	}
	public String getTypeAffaire() {
		return typeAffaire;
	}
	public void setTypeAffaire(String typeAffaire) {
		this.typeAffaire = typeAffaire;
	}
	public Date getDateEmbouche() {
		return dateEmbouche;
	}
	public void setDateEmbouche(Date dateEmbouche) {
		this.dateEmbouche = dateEmbouche;
	}
	public String getProbleme() {
		return probleme;
	}
	public void setProbleme(String probleme) {
		this.probleme = probleme;
	}
	public String getRaison() {
		return raison;
	}
	public void setRaison(String raison) {
		this.raison = raison;
	}
	public String getQuestionair() {
		return questionair;
	}
	public void setQuestionair(String questionair) {
		this.questionair = questionair;
	}
	public Long getAncienne() {
		return ancienne;
	}
	public void setAncienne(Long ancienne) {
		this.ancienne = ancienne;
	}
	public Long getAnnée() {
		return année;
	}
	public void setAnnée(Long année) {
		this.année = année;
	}

    private Long id;
	
	private String name;
	
	private Long matricule;
	
	private String typeAffaire;
	
	private Date dateEmbouche;
	
	private String probleme;
	
	private String raison;
	
	private String questionair;

	private Long ancienne;
	
	private Long année;
	public AffaireInterneDto() {
	}
	
}

