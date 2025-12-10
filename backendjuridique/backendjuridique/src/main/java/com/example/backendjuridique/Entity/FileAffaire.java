package com.example.backendjuridique.Entity;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

import lombok.Builder;
import lombok.Data;


@Entity
@Data

@Builder
public class FileAffaire {
    public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
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

	public AffaireInterne getAffaire() {
		return affaire;
	}

	public void setAffaire(AffaireInterne affaire) {
		this.affaire = affaire;
	}

	public byte[] getFileAffaireContent() {
		return FileAffaireContent;
	}

	public void setFileAffaireContent(byte[] FileAffaireContent) {
		this.FileAffaireContent = FileAffaireContent;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "affaire_id")
    private AffaireInterne affaire;

    private String type;

    @Column(name = "FileAffaire-content", unique = false, nullable = false, length =1000000000)
    @Lob
    private byte[] FileAffaireContent;

@Column(name = "date_creation")
private Date dateCreation;

    public Date getDateCreation() {
	return dateCreation;
}

public void setDateCreation(Date dateCreation) {
	this.dateCreation = dateCreation;
}

	// Méthode build pour créer une instance de FileAffaire.Builder
    public static Builder builder() {
        return new Builder();
    }

    // Builder pour la classe FileAffaire
    public static class Builder {
        private Long id;
        private String name;
        private AffaireInterne affaire;
        private String type;
        private byte[] FileAffaireContent;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder affaire(AffaireInterne affaire) {
            this.affaire = affaire;
            return this;
        }

         public Builder type(String type) {
            this.type = type;
            return this;
        }

        public Builder FileAffaireContent(byte[] FileAffaireContent) {
            this.FileAffaireContent = FileAffaireContent;
            return this;
        }
  
        public FileAffaire build() {
        	 FileAffaire FileAffaire = new FileAffaire();
             FileAffaire.setId(this.id);
             FileAffaire.setName(this.name);
             FileAffaire.setAffaire(this.affaire);
             FileAffaire.setType(this.type);
             FileAffaire.setFileAffaireContent(this.FileAffaireContent);
             return FileAffaire;
        }
    }
}
