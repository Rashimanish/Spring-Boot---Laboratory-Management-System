package com.example.loginreg.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.AppointmentDTO;
import com.example.loginreg.dto.DoctorDTO;
import com.example.loginreg.dto.UserDto;
import com.example.loginreg.entity.Appointment;
import com.example.loginreg.entity.Doctor;
import com.example.loginreg.entity.Test;
import com.example.loginreg.entity.User;
import com.example.loginreg.factory.AppointmentNumberFactory;
import com.example.loginreg.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;



    @Override
    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        String appointmentNumber = AppointmentNumberFactory.generateAppointmentNumber(appointmentDTO.getType());
        LocalDateTime appointmentDateTime = getNextAvailableAppointmentTime();
    
        appointmentDTO.setNumber(appointmentNumber);
        appointmentDTO.setDateTime(appointmentDateTime);
    
        appointmentDTO.setTechnician(null);
        appointmentDTO.setDoctor(null);
    
        Appointment appointment = convertToEntity(appointmentDTO);
        appointmentRepository.save(appointment);
    
        return appointmentDTO;
    }

    @Override
    // Method to set technician and doctor when patient comes to the hospital
    public void updateAppointmentDetails(String appointmentId, UserDto technician, DoctorDTO doctor) {
        Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);
        if (appointment != null) {
            if (technician != null) {
                appointment.setTechnician(convertToUserEntity(technician));
            }
            if (doctor != null) {
                appointment.setDoctor(convertToDoctorEntity(doctor));
            }
            appointmentRepository.save(appointment);
        }
    }

    private LocalDateTime getNextAvailableAppointmentTime() {
        LocalDate today = LocalDate.now();
        LocalTime startTime = LocalTime.of(0, 0);
        LocalTime endTime = LocalTime.of(23, 58);
        LocalDateTime now = LocalDateTime.now();

        boolean hasExistingAppointments = appointmentRepository.existsByDateTimeBetween(
            LocalDateTime.of(today, startTime),
            LocalDateTime.of(today, endTime)
        );

        if (!hasExistingAppointments) {
            return now;
        }

        LocalDateTime nextAvailableTime = LocalDateTime.of(today, startTime);
        while (nextAvailableTime.isBefore(now) || nextAvailableTime.toLocalTime().isBefore(startTime)) {
            nextAvailableTime = nextAvailableTime.plusMinutes(15);
        }

        if (nextAvailableTime.toLocalTime().isAfter(endTime)) {
            nextAvailableTime = nextAvailableTime.plusDays(1).withHour(9).withMinute(0);
        }

        return nextAvailableTime;
    }

    private Appointment convertToEntity(AppointmentDTO appointmentDTO) {
        Appointment appointment = new Appointment();
        appointment.setId(appointmentDTO.getId());
        appointment.setType(appointmentDTO.getType());
        appointment.setNumber(appointmentDTO.getNumber());
        appointment.setDateTime(appointmentDTO.getDateTime()); // Set the combined date and time
        appointment.setStatus(appointmentDTO.getStatus());

        if (appointmentDTO.getUser() != null) {
            User user = new User();
            user.setId(appointmentDTO.getUser().getId());
            appointment.setUser(user);
        }

        if (appointmentDTO.getTest() != null) {
            Test test = new Test();
            test.setId(appointmentDTO.getTest().getId());
            appointment.setTest(test);
        }

        if (appointmentDTO.getDoctor() != null) {
            Doctor doctor = new Doctor();
            doctor.setId(appointmentDTO.getDoctor().getId());
            appointment.setDoctor(doctor);
        }

        if (appointmentDTO.getTechnician() != null) {
            User technician = new User();
            technician.setId(appointmentDTO.getTechnician().getId());
            appointment.setTechnician(technician);
        }

        return appointment;
    }

    private User convertToUserEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
       
        return user;
    }

    private Doctor convertToDoctorEntity(DoctorDTO doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setId(doctorDto.getId());
        doctor.setName(doctorDto.getName());
        doctor.setSpecialization(doctorDto.getSpecialization());
        
        return doctor;
    }
}