package com.example.loginreg.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.TestResult;

@Repository
public interface TestResultRepository extends MongoRepository<TestResult, String> {
    List<TestResult> findByPatientName(String username);
    List<TestResult> findByTechnician (String username);
    
}
