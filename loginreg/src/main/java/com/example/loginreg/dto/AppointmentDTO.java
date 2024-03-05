package com.example.loginreg.dto;

import java.time.LocalDateTime;


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
public class AppointmentDTO {

    private String id;
    private String type;
    private String number;
    private LocalDateTime dateTime;
    private String status;
    private TestDTO test;
    private UserDto user;
    private DoctorDTO doctor;
    private UserDto technician;



    
}
