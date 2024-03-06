package com.example.loginreg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.dto.AppointmentDTO;
import com.example.loginreg.dto.DoctorDTO;
import com.example.loginreg.dto.UserDto;
import com.example.loginreg.service.AppointmentService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/appointment")
public class AppointmentContoller {

    @Autowired
    private AppointmentService appointmentService;

    @PostMapping("/create")
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        AppointmentDTO createdAppointment = appointmentService.createAppointment(appointmentDTO);
        return new ResponseEntity<>(createdAppointment, HttpStatus.CREATED);
    }

    @PutMapping("/{appointmentId}/update")
    public ResponseEntity<String> updateAppointmentDetails(@PathVariable String appointmentId,
                                                           @RequestBody UpdateAppointmentRequest
                                                           updateRequest) {
        appointmentService.updateAppointmentDetails(appointmentId, updateRequest.getTechnician(), updateRequest.getDoctor());
        return new ResponseEntity<>("Appointment details updated successfully", HttpStatus.OK);
    }

     static class UpdateAppointmentRequest {
        private UserDto technician;
        private DoctorDTO doctor;

        public UserDto getTechnician() {
            return technician;
        }

        public void setTechnician(UserDto technician) {
            this.technician = technician;
        }

        public DoctorDTO getDoctor() {
            return doctor;
        }

        public void setDoctor(DoctorDTO doctor) {
            this.doctor = doctor;
        }
    }
    
}
