package com.example.loginreg.entity;


import java.time.LocalDateTime;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
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
    private LocalDateTime dateTime;
    private String status;
    @DBRef
    private Test test;
    @DBRef
    private User user;
    @DBRef
    private Doctor doctor;
    @DBRef
    private User technician;
}
