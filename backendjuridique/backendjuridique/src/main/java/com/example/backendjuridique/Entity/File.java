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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data

@Builder
public class File {
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

	public Affaire getAffaire() {
		return affaire;
	}

	public void setAffaire(Affaire affaire) {
		this.affaire = affaire;
	}

	public byte[] getFileContent() {
		return fileContent;
	}

	public void setFileContent(byte[] fileContent) {
		this.fileContent = fileContent;
	}

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "affaire_id")
    private Affaire affaire;

    private String type;

    @Column(name = "file-content", unique = false, nullable = false, length =1000000000)
    @Lob
    private byte[] fileContent;

@Column(name = "date_creation")
private Date dateCreation;

    public Date getDateCreation() {
	return dateCreation;
}

public void setDateCreation(Date dateCreation) {
	this.dateCreation = dateCreation;
}

	// Méthode build pour créer une instance de File.Builder
    public static Builder builder() {
        return new Builder();
    }

    // Builder pour la classe File
    public static class Builder {
        private Long id;
        private String name;
        private Affaire affaire;
        private String type;
        private byte[] fileContent;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder affaire(Affaire affaire) {
            this.affaire = affaire;
            return this;
        }

        public Builder type(String type) {
            this.type = type;
            return this;
        }

        public Builder fileContent(byte[] fileContent) {
            this.fileContent = fileContent;
            return this;
        }
  
        public File build() {
        	 File file = new File();
             file.setId(this.id);
             file.setName(this.name);
             file.setAffaire(this.affaire);
             file.setType(this.type);
             file.setFileContent(this.fileContent);
             return file;
        }
    }
}
