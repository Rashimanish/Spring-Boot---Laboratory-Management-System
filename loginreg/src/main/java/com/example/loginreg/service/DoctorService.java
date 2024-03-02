package com.example.loginreg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.DoctorDTO;

@Service
public interface DoctorService  {

    List <DoctorDTO> getAllDoctors();

    DoctorDTO getDoctorById(String id);

    DoctorDTO addDoctor (DoctorDTO doctorDTO);

    void deleteDoctor(String id);

    DoctorDTO updateDoctor(String id, DoctorDTO doctorDTO);

    
}
