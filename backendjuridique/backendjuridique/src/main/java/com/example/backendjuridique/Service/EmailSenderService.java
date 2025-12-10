package com.example.backendjuridique.Service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public interface EmailSenderService {
	
 String sendEmail(MultipartFile[] file, String to,String[] cc, String subject, String body);
 
 String sendNotification(String to,String[] cc,String subject, String body);
}
