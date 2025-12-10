package com.example.backendjuridique;

	import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.EnableScheduling;
    import org.springframework.scheduling.annotation.Scheduled;
	import org.springframework.stereotype.Component;

import com.example.backendjuridique.Entity.Affaire;
import com.example.backendjuridique.Sevice.impl.AffaireServiceImpl;

import com.example.backendjuridique.dto.AffaireDto;

import jakarta.mail.internet.MimeMessage;

	@Component
	@EnableScheduling
	public class EmailScheduler {
      Affaire affaire;
      @Value("${spring.mail.username}")
      private String fromEmail;

      @Autowired
      private JavaMailSender javaMailSender;
      @Autowired 
  	private AffaireServiceImpl affaireService;
   
   // Méthode pour obtenir toutes les affaires
      public List<AffaireDto> getAllAffaires() {
          // Implémentation de la méthode pour récupérer les affaires
          return affaireService.getAllAffaires(); // Par exemple
      }

      // Méthode pour parcourir les affaires
      public void parcourirAffaires() {
         
      }
	    
      @Scheduled(cron = "0 0 10-11 * * *")

	    public void sendDailyEmail() {
	    	 List<AffaireDto> affaires = getAllAffaires(); // Appel de la méthode pour obtenir les affaires

	          // Boucle for pour parcourir les affaires
	          for (AffaireDto affaire : affaires) {
	        	  if(affaire.getDateReunion()!=null) {
	        	  LocalDate localDate = affaire.getDateReunion().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
	  	        // Obtenir la date d'aujourd'hui
	  	        LocalDate currentDate = LocalDate.now();
	  	        
	  	        // Calculer la différence en jours
	  	        long difference = ChronoUnit.DAYS.between( currentDate,localDate);
	              // Faites quelque chose avec chaque affaire
	  	     // System.out.println("La différence en jours est : " +difference+" currentDate " +currentDate+ " DateReunion " +localDate);
	             if(difference==affaire.getPeriodeNotification()) {
	            	 try {
	            	 MimeMessage mimeMessage = javaMailSender.createMimeMessage();

	                 MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

	                 mimeMessageHelper.setFrom(fromEmail);
	                 mimeMessageHelper.setTo("chtiouiines0@gmail.com");
	                 mimeMessageHelper.setCc("chtiouiines0@gmail.com");
	                 mimeMessageHelper.setSubject(affaire.getTypeAffaire());
	                 mimeMessageHelper.setText("body00true");
	                

	                 javaMailSender.send(mimeMessage);

	            	 }
	            	 catch (Exception e) {
	                     throw new RuntimeException(e);
	                 }
	             }
	        	  } // Par exemple, affichage de chaque affaire
	          }
	    	
	    }
	}


