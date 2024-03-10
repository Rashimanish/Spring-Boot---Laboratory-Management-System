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
        LocalDateTime appointmentDateTime = getNextAvailableAppointmentTime(LocalDate.parse(appointmentDTO.getDate()));

        appointmentDTO.setNumber(appointmentNumber);
        appointmentDTO.setDateTime(appointmentDateTime);

        // Set other fields as needed

        Appointment appointment = convertToEntity(appointmentDTO);
        appointmentRepository.save(appointment);

        return appointmentDTO;
    }

    @Override
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