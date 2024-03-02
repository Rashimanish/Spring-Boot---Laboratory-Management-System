package com.example.loginreg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.DoctorDTO;
import com.example.loginreg.entity.Doctor;
import com.example.loginreg.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService{

    @Autowired
    private DoctorRepository doctorRepository;

    private final ModelMapper modelMapper;

    public DoctorServiceImpl() {
        this.modelMapper = new ModelMapper();
    }

    @Override
    public List<DoctorDTO> getAllDoctors() {
        List <Doctor> doctors = doctorRepository.findAll();
        return doctors.stream().map
        (this::convertToDTO)
                .collect(Collectors.toList());
        
    }

    @Override
    public DoctorDTO getDoctorById(String id) {
        return doctorRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
        
    }

    @Override
    public DoctorDTO addDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = convertToEntity(doctorDTO);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDTO(savedDoctor);
       
    }

    @Override
    public void deleteDoctor(String id) {
       doctorRepository.deleteById(id);
    }

    @Override
    public DoctorDTO updateDoctor(String id, DoctorDTO doctorDTO) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
        if (doctor != null && doctorDTO != null) {
            doctor.setName(doctorDTO.getName());
            doctor.setSpecialization(doctorDTO.getSpecialization());
            doctorRepository.save(doctor);
            return convertToDTO(doctor);
        }
        return null;
        
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        return modelMapper.map(doctor, DoctorDTO.class);
    }

    private Doctor convertToEntity(DoctorDTO doctorDTO) {
        return modelMapper.map(doctorDTO, Doctor.class);
    }
    
}
