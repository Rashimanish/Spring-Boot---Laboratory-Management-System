package com.example.loginreg.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.TestResultDTO;
import com.example.loginreg.entity.TestResult;

@Service
public interface TestResultService {
    TestResultDTO createTestResult(TestResultDTO testResultDTO);
    List<TestResultDTO> getAllTestResults();
    List<TestResultDTO> getTestResultsByUser(String username);
    Optional<TestResult> getTestResultById(String id);
    
}
