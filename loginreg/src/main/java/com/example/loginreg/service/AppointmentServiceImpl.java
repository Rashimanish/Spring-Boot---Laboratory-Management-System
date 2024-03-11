package com.example.loginreg.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.AppointmentDTO;
import com.example.loginreg.entity.Appointment;
import com.example.loginreg.factory.AppointmentNumberFactory;
import com.example.loginreg.repository.AppointmentRepository;


@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Override
    public List<AppointmentDTO> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        String appointmentNumber = AppointmentNumberFactory.generateAppointmentNumber(appointmentDTO.getType());
        LocalDateTime appointmentDateTime = getNextAvailableAppointmentTime(LocalDate.parse(appointmentDTO.getDate()));

        appointmentDTO.setNumber(appointmentNumber);
        appointmentDTO.setDateTime(appointmentDateTime);
        appointmentDTO.setStatus("Active");
        appointmentDTO.setTechnician("N/A");
        appointmentDTO.setDoctor("N/A");

        Appointment appointment = convertToEntity(appointmentDTO);
        appointmentRepository.save(appointment);

        return appointmentDTO;
    }
    @Override
    public void updateAppointmentDetails(String appointmentId, AppointmentDTO updatedAppointment) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            if (updatedAppointment.getType() != null) {
                appointment.setType(updatedAppointment.getType());
            }
            if (updatedAppointment.getDateTime() != null) {
                appointment.setDateTime(updatedAppointment.getDateTime());
            }
            if (updatedAppointment.getStatus() != null) {
                appointment.setStatus(updatedAppointment.getStatus());
            }
            if (updatedAppointment.getPatientName() != null) {
                appointment.setPatientName(updatedAppointment.getPatientName());
            }
            if (updatedAppointment.getTest() != null) {
                appointment.setTest(updatedAppointment.getTest());
            }
            if (updatedAppointment.getDoctor() != null) {
                appointment.setDoctor(updatedAppointment.getDoctor());
            }
            if (updatedAppointment.getTechnician() != null) {
                appointment.setTechnician(updatedAppointment.getTechnician());
            }
    
            appointmentRepository.save(appointment);
        }
    }
    private LocalDateTime getNextAvailableAppointmentTime(LocalDate selectedDate) {
        LocalTime startTime = LocalTime.of(9, 0);
        LocalTime endTime = LocalTime.of(17, 0); // Assuming appointments end at 5 PM

        LocalDateTime nextAvailableTime = LocalDateTime.of(selectedDate, startTime);

        // Find the next available time slot for the selected date
        while (nextAvailableTime.isBefore(LocalDateTime.of(selectedDate, endTime))) {
            boolean isAvailable = !appointmentRepository.existsByDateTime(nextAvailableTime);
            if (isAvailable) {
                return nextAvailableTime;
            }
            nextAvailableTime = nextAvailableTime.plusMinutes(15); // Check availability every 15 minutes
        }

        // No available slot found for the selected date, return null or throw an exception
        return null;
    }

    @Override
    public void cancelAppointment(String appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            appointment.setStatus("Canceled");
            appointmentRepository.save(appointment);
        }
    }

    
    private Appointment convertToEntity(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDTO.getId());
        appointment.setType(appointmentDTO.getType());
        appointment.setNumber(appointmentDTO.getNumber());
        appointment.setDateTime(appointmentDTO.getDateTime()); 
        appointment.setStatus(appointmentDTO.getStatus());
        appointment.setPatientName(appointmentDTO.getPatientName());
        appointment.setTest(appointmentDTO.getTest());
        appointment.setDoctor(appointmentDTO.getDoctor());
        appointment.setTechnician(appointmentDTO.getTechnician());

        return appointment;
    }


     private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setType(appointment.getType());
        dto.setNumber(appointment.getNumber());
        dto.setDateTime(appointment.getDateTime());
        dto.setStatus(appointment.getStatus());
        dto.setPatientName(appointment.getPatientName());
        dto.setTest(appointment.getTest());
        dto.setDoctor(appointment.getDoctor());
        dto.setTechnician(appointment.getTechnician());
        

        return dto;
    }


}