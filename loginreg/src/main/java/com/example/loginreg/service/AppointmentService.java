package com.example.loginreg.service;


import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.AppointmentDTO;


@Service
public interface AppointmentService {
    List<AppointmentDTO> getAllAppointments();
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    void updateAppointmentDetails(String appointmentId, AppointmentDTO updatedAppointment);
    public void cancelAppointment(String appointmentId);
    List<AppointmentDTO> getAppointmentsByUser(String username);
    List <AppointmentDTO>getAppointmentTech(String username);
    AppointmentDTO getAppointmentById(String appointmentId);
    Map<String, Long> getPeakAppointmentTimes(int year, int month , int date);

    
} 
