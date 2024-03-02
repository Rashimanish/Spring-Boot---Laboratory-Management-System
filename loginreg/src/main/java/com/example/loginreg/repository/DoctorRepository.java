package com.example.loginreg.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.Doctor;

@Repository
public interface DoctorRepository extends MongoRepository <Doctor , String> {

    
}
