package com.example.backendjuridique.dto;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.Entity.Commentaire;
import com.example.backendjuridique.Entity.File;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class AffaireDto {
	private Long id;
	private 	Long periodeNotification;
	private String nameAvocat;
	
	private String nameEmployee;

	private Long matriculeEmployee;
	
	private String typeAffaire;
	
	private String status;
	private Date dateReunion;

	private String avis;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNameAvocat() {
		return nameAvocat;
	}
	public void setNameAvocat(String nameAvocat) {
		this.nameAvocat = nameAvocat;
	}
	public String getNameEmployee() {
		return nameEmployee;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date date) {
		this.dateCreation=date;
	}
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
	}
	@Temporal(TemporalType.TIMESTAMP)
    @Column(name = "date_creation")
    private Date dateCreation;
	@PrePersist
    protected void onCreate() {
        this.dateCreation = new Date();
    }
    
	public Long getMatriculeEmployee() {
		return matriculeEmployee;
	}
	public void setMatriculeEmployee(Long matriculeEmployee) {
		this.matriculeEmployee = matriculeEmployee;
	}
	public String getTypeAffaire() {
		return typeAffaire;
	}
	public void setTypeAffaire(String typeAffaire) {
		this.typeAffaire = typeAffaire;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getDateReunion() {
		return dateReunion;
	}
	public void setDateReunion(Date dateReunion) {
		this.dateReunion = dateReunion;
	}
	public Long getPeriodeNotification() {
	
		return periodeNotification;
	}
	public void setPeriodeNotification(Long periodeNotification) {
		this.periodeNotification = periodeNotification;
	}
	public List<Commentaire> getCommentaires() {
		return commentaires;
	}
	public void setCommentaires(List<Commentaire> commentaires) {
		this.commentaires = commentaires;
	}
	public List<File> getFile() {
		return file;
	}
	public void setFile(List<File> file) {
		this.file = file;
	}
	public String getAvis() {
		return avis;
	}
	public void setAvis(String avis) {
		this.avis = avis;
	}
	private String plant;
	public String getPlant() {
		return plant;
	}
	public void setPlant(String plant) {
		this.plant = plant;
	}

	@JsonIgnore
	@OneToMany(mappedBy="Affaire" ,cascade=CascadeType.ALL)
	private List<Commentaire> commentaires;
	@JsonIgnore
	@OneToMany(mappedBy="Affaire" ,cascade=CascadeType.ALL)
	private List<File> file;
	
	@Column(name="MontantGlobal")
	private Long montantGlobal;
	
	@Column(name="MontantEntrant")
	private Long montantEntrant;
	
	public Long getMontantGlobal() {
		return montantGlobal;
	}
	public void setMontantGlobal(Long montantGlobal) {
		this.montantGlobal = montantGlobal;
	}
	public Long getMontantEntrant() {
		return montantEntrant;
	}
	public void setMontantEntrant(Long montantEntrant) {
	this.montantEntrant = montantEntrant;
	}
	public AffaireDto(Long id, String nameAvocat, String nameEmployee, Long matriculeEmployee, String typeAffaire,
			String status, Date dateReunion, String avis,Long periodeNotification, Date dateCreation,String plant,Long MG, Long ME) {
		super();
		this.id = id;
		this.nameAvocat = nameAvocat;
		this.nameEmployee = nameEmployee;
		this.matriculeEmployee = matriculeEmployee;
		this.typeAffaire = typeAffaire;
		this.status = status;
		this.dateReunion = dateReunion;
		this.avis = avis;
		this.periodeNotification=periodeNotification;
		this.dateCreation=dateCreation;
		this.plant=plant;
		this.montantGlobal=MG;
		this.montantEntrant=ME;
		
	}
}
	
