package com.example.loginreg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.dto.DoctorDTO;
import com.example.loginreg.service.DoctorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/doctors")
public class DoctorContoller {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/viewall")
    public ResponseEntity<List<DoctorDTO>>getAllDoctors(){
        try{
            List<DoctorDTO>
            doctors = doctorService.getAllDoctors();
            return new ResponseEntity<>(doctors,HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO>
    getDoctorById(@PathVariable String id){
        try{
            DoctorDTO doctorDTO = doctorService.getDoctorById(id);
            if (doctorDTO != null){
                return new ResponseEntity<>(doctorDTO,HttpStatus.OK);
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            }catch(Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

        @PostMapping("/adddoctor")
        public ResponseEntity<DoctorDTO> addDoctor (@RequestBody DoctorDTO doctorDTO){
            try{
                DoctorDTO savedDoctor = doctorService.addDoctor(doctorDTO);
                return new ResponseEntity<>(savedDoctor,HttpStatus.CREATED);
            }catch(Exception e){
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @DeleteMapping("/delete/{id}")
        public ResponseEntity<String> deleteDoctor (@PathVariable String id){
            try{
                doctorService.deleteDoctor(id);
                return new ResponseEntity<>("Doctor deleted succcessfully",HttpStatus.OK);
            }catch(Exception e){
                return new ResponseEntity<>("Error deleting doctor", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @PutMapping("/update/{id}")
        public ResponseEntity<DoctorDTO>updateDoctor(@PathVariable String id, @RequestBody DoctorDTO doctorDTO){
            try{
                DoctorDTO updatedDoctor = doctorService.updateDoctor(id, doctorDTO);
                if (updatedDoctor != null) {
                    return new ResponseEntity<>(updatedDoctor,HttpStatus.OK);                  
            }else{
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            }catch(Exception e){
                return new
                ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }
    
    

