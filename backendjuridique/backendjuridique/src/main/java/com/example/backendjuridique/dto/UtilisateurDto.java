package com.example.backendjuridique.dto;

import lombok.AllArgsConstructor;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class UtilisateurDto {

	

    private Long id;
	private String email;
	private String name;
	private Long matricule;
	private String password;
	private Long num;
	private String type;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getMatricule() {
		return matricule;
	}
	public void setMatricule(Long matricule) {
		this.matricule = matricule;
	}
	public Long getNum() {
		return num;
	}
	public void setNum(Long num) {
		this.num = num;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public UtilisateurDto(Long id, String name, String email, Long matricule, Long num, String type, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.matricule = matricule;
		this.num = num;
		this.type = type;
		this.password = password;
	}
	public UtilisateurDto( String name, String email, Long matricule, Long num, String type, String password) {
		super();
		this.name = name;
		this.email = email;
		this.matricule = matricule;
		this.num = num;
		this.type = type;
		this.password = password;
	}
	public UtilisateurDto() {}
}
