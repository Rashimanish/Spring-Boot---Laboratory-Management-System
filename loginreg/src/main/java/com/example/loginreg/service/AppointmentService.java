package com.example.loginreg.service;


import org.springframework.stereotype.Service;

import com.example.loginreg.dto.AppointmentDTO;
import com.example.loginreg.dto.DoctorDTO;
import com.example.loginreg.dto.UserDto;

@Service
public interface AppointmentService {
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    void updateAppointmentDetails(String appointmentId, UserDto technician, DoctorDTO doctor);

    
} 
