package com.example.backendjuridique.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backendjuridique.Service.EmailSenderService;


@CrossOrigin("*")
@RestController
@RequestMapping("/mail")
public class EmailController {

	public EmailController(EmailSenderService emailSenderService) {
		this.emailSenderService = emailSenderService;
	}

	private  final EmailSenderService emailSenderService;
	
	  @PostMapping("/send")
	    public String sendMail(@RequestParam(value = "file", required = false) MultipartFile[] file, String to, String[] cc, String subject, String body) {
	        return emailSenderService.sendEmail(file, to, cc, subject, body);
	    }
	  @PostMapping("/notification")
	  public String sendNotification( String to, String[] cc, String subject, String link, String firstName, String lastName) {
		  String template = "Bonjour, ${firstName} ${lastName}!<br/>"
		                    + "Cet email vous presente <a href=${link}>une nouvelle affaire</a>, veuillez la consulter, en acceptant ou en refusant l'affaire en question.<br/>"
		                    + "Nous espérons que vous passez une bonne journée ! <br/>"
		                    + "Cordialement,<br/>"
		                    + "L'équipe juridique";

		  template = template.replace("${firstName}", firstName);
		  template = template.replace("${lastName}", lastName);
		  template = template.replace("${link}", link);
		  /*Map<String, Object> variables = new HashMap<>();
		  variables.put("firstName", firstName);
		  variables.put("lastName", lastName);*/

		  return emailSenderService.sendNotification( to, cc, subject, template);
	    }
}