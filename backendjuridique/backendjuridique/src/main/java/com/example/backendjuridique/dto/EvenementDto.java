package com.example.backendjuridique.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class EvenementDto {
	
    private Long id;
	
	private String titre;
	
	private Date date;
	
	private String[] emails;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String[] getEmails() {
		return emails;
	}
	public void setEmails(String[] emails) {
		this.emails = emails;
	}
	public EvenementDto(Long id, String titre, Date date, String[] emails) {
		
		this.id = id;
		this.titre = titre;
		this.date = date;
		this.emails = emails;
	}
	public EvenementDto() {}
  
}
