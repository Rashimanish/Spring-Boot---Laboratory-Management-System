package com.example.loginreg.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.Payment;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String>{
    

}
