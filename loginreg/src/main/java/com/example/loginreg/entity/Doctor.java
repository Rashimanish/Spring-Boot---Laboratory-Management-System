package com.example.loginreg.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "doctor")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
    @Id
    private String id;
    private String name;
    private String specialization;
    
}
