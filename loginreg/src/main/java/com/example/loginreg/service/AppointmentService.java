package com.example.loginreg.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.AppointmentDTO;


@Service
public interface AppointmentService {
    List<AppointmentDTO> getAllAppointments();
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    void updateAppointmentDetails(String appointmentId, AppointmentDTO updatedAppointment);
    public void cancelAppointment(String appointmentId);
    List<AppointmentDTO> getAppointmentsByUser(String username);
    AppointmentDTO getAppointmentById(String appointmentId);

    
} 
