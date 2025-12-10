package com.example.backendjuridique.Entity;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
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
@Entity
@Table(name="Affaire")
public class Affaire {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(name="nameAvocat")
	private String nameAvocat;
	@Column(name="nameEmployee")
	private String nameEmployee;
	@Column(name="matriculeEmployee")
	private Long matriculeEmployee;
	@Column(name="typeAffaire")
	private String typeAffaire;
	@Column(name="periodeNotification")
	private Long periodeNotification;
	@Column(name="plant")
	private String plant;
	public String getPlant() {
		return plant;
	}
	public void setPlant(String plant) {
		this.plant = plant;
	}

	@Column(name="status")
	private String status;
	
	@Column(name="MontantGlobal")
	private Long montantGlobal;
	
	@Column(name="MontantEntrant")
	private Long montantEntrant;
	public Long getId() {
		return id;
	}
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
	public Long getPeriodeNotification() {
		return periodeNotification;
	}
	public void setPeriodeNotification(Long periodeNotification) {
		this.periodeNotification = periodeNotification;
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
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
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
	public String getAvis() {
		return avis;
	}
	public void setAvis(String avis) {
		this.avis = avis;
	}
	public Date getDateCreation() {
		return dateCreation;
	}
	public void setDateCreation(Date date) {
		this.dateCreation=date;
	}
	
	@JsonIgnore
	@OneToMany(mappedBy="affaire" ,cascade=CascadeType.ALL)
	private List<Commentaire> commentaires;

	@JsonIgnore
	@OneToMany(mappedBy="affaire" ,cascade=CascadeType.ALL)
	private List<File> file;
	 
	public Affaire(Long id, String nameAvocat, String nameEmployee, Long matriculeEmployee, String typeAffaire,
			String status, Date dateReunion, String avis,Long periodeNotification,Date dateCreation,String plant,Long MontantG ,Long MontantE) {
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
		this.montantGlobal=MontantG;
		this.montantEntrant=MontantE;
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
	public Affaire(String nameAvocat, String nameEmployee, Long matriculeEmployee, String typeAffaire, String status,
			Date dateReunion, String avis,Long periodeNotification, Date dateCreation) {
		super();
		this.nameAvocat = nameAvocat;
		this.nameEmployee = nameEmployee;
		this.matriculeEmployee = matriculeEmployee;
		this.typeAffaire = typeAffaire;
		this.status = status;
		this.dateReunion = dateReunion;
		this.avis = avis;
		this.periodeNotification=periodeNotification;
		this.dateCreation=dateCreation;
	}
	 @Temporal(TemporalType.TIMESTAMP)
	    @Column(name = "date_creation")
	    private Date dateCreation;

	public Affaire() {}
	@Column(name="dateReunion")
	private Date dateReunion;
	@Column(name="avis")
	private String avis;
	@Override
	public String toString() {
		return "Affaire [id=" + id + ", nameAvocat=" + nameAvocat + ", nameEmployee=" + nameEmployee
				+ ", matriculeEmployee=" + matriculeEmployee + ", typeAffaire=" + typeAffaire + ", status=" + status
				+ ", avis=" + avis + " , periodeNotification=" +  periodeNotification + "]";
	}

    @PrePersist
    protected void onCreate() {
        this.dateCreation = new Date();
    }
    
}