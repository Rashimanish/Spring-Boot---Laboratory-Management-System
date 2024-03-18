package com.example.loginreg.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "payment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Payment {
    private String id;
    private String token;
    private String appointmentId;
    private String testName;
    private String patientName;
    private Double testPrice;
    private String status;
    private String emailAddress;
    
}
