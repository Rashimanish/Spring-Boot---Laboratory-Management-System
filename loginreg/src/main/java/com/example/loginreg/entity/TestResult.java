package com.example.loginreg.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "result")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestResult {
    private String appointmentId;
    private String appointmentType;
    private String appointmentNumber;
    private String appointmentDateTime;
    private String patientName;
    private String testName;
    private String technician;
    private String testCode;
    private String testRange;
    private String remark;
    private String description;
    
}
