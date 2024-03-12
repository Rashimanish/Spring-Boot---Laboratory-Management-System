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
public class TestResultDTO {
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
