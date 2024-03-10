package com.example.loginreg.repository;


import java.time.LocalDateTime;


import org.springframework.data.mongodb.repository.MongoRepository;

import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.Appointment;

@Repository
public interface AppointmentRepository extends MongoRepository <Appointment , String>{
    boolean existsByDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    boolean existsByDateTime(LocalDateTime nextAvailableTime);
}
    

