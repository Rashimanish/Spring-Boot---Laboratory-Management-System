package com.example.loginreg.entity;


import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "appointment")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {

    @Id
    private String id;
    private String type;
    private String number;
    private String date;
    private LocalDateTime dateTime;
    private String status;
    private String patientName;
    private String test;
    private double testPrice;
    private String doctor;
    private String technician;
}
