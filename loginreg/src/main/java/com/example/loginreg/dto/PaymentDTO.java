package com.example.loginreg.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PaymentDTO {
    private String id;
    private String token;
    private String appointmentId;
    private String testName;
    private String patientName;
    private Double testPrice;
    private String status;
    private String emailAddress;
    
}
