package com.example.backendjuridique.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.backendjuridique.Service.FileService;
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:5173") // Autoriser les requêtes depuis ce domaine
                .allowedMethods("GET", "POST", "PUT", "DELETE"); // Autoriser ces méthodes HTTP
    }
    @Bean
    public FileService fileService() {
        return new FileService();
    }
}
