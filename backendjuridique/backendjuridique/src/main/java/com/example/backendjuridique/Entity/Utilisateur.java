package com.example.backendjuridique.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name="User")
public class Utilisateur {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(name="name")
	private String name;
	@Column(name="email",nullable=false,unique=true)
	private String email;
	@Column(name="Matricule")
	private Long matricule;
	@Column(name="numero")
	private Long num;
	@Column(name="type-utilisateur")
	private String type;
	@Column(name="password")
	private String password;
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
	public Utilisateur(Long id, String name, String email, Long matricule, Long num, String type, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.matricule = matricule;
		this.num = num;
		this.type = type;
		this.password = password;
	}
	public Utilisateur(String name, String email, Long matricule, Long num, String type, String password) {
		super();
		this.name = name;
		this.email = email;
		this.matricule = matricule;
		this.num = num;
		this.type = type;
		this.password = password;
	}
	public Utilisateur() {}
	@Override
	public String toString() {
		return "Utilisateur [id=" + id + ", email=" + email + ", name=" + name + ", matricule=" + matricule
				+ ", password=" + password + ", num=" + num + ", type=" + type + "]";
	}
	
	
	
}
