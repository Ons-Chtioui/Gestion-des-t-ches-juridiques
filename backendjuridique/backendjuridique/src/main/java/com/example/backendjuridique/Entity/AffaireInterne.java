package com.example.backendjuridique.Entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="AffaireInterne")
public class AffaireInterne {
	
	public AffaireInterne(Long id, String name, Long matricule, String typeAffaire, Date dateEmbouche, String probleme,
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
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(name="name")
	private String name;
	@Column(name="matricule")
	private Long matricule;
	@Column(name="typeAffaire")
	private String typeAffaire;
	@Column(name="date")
	private Date dateEmbouche;
	@Column(name="probleme")
	private String probleme;
	@Column(name="raison")
	private String raison;
	@Column(name="questionair")
	private String questionair;
	@Column(name="ancienne")
	private Long ancienne;
	@Column(name="année")
	private Long année;
	public AffaireInterne() {
	}
	
	@JsonIgnore
	@OneToMany(mappedBy="affaire" ,cascade=CascadeType.ALL)
	private List<FileAffaire> file;
	 
}
