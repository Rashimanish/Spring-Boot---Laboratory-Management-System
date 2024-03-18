package com.example.loginreg.service;

import java.util.Properties;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;


@Service
public class EmailService {
   // Singleton instance
   private static EmailService instance;

   // Private constructor to prevent instantiation from other classes
   private EmailService() {
       // Initialize email properties
       Properties properties = new Properties();
       properties.put("mail.smtp.auth", "true");
       properties.put("mail.smtp.starttls.enable", "true");
       properties.put("mail.smtp.host", "smtp-mail.outlook.com");
       properties.put("mail.smtp.port", "587");

       // Sender credentials
       final String username = "rashmimanish5@outlook.com";
       final String password = "MickeyR@shm1";

       // Create session with authentication
       session = Session.getInstance(properties, new Authenticator() {
           @Override
           protected PasswordAuthentication getPasswordAuthentication() {
               return new PasswordAuthentication(username, password);
           }
       });
   }

   // Static factory method to provide global access to the singleton instance
   public static EmailService getInstance() {
       if (instance == null) {
           instance = new EmailService();
       }
       return instance;
   }

   private Session session;

   // Method to send email
   public void sendEmail(String to, String subject, String body) throws MessagingException {
       // Create message
       Message message = new MimeMessage(session);
       message.setFrom(new InternetAddress("rashmimanish5@outlook.com"));
       message.setRecipient(Message.RecipientType.TO, new InternetAddress(to));
       message.setSubject(subject);
       message.setContent(body, "text/html");

       // Send message
       Transport.send(message);
   }
}

