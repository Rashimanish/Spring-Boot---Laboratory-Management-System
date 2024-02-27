package com.example.loginreg.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {

    @Id
    private String id;
    private String testCode;
    private String testName;
    private double price;
    
    
}
