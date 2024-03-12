package com.example.loginreg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.TestResultDTO;

@Service
public interface TestResultService {
    TestResultDTO createTestResult(TestResultDTO testResultDTO);
    List<TestResultDTO> getAllTestResults();
    List<TestResultDTO> getTestResultsByUser(String username);
    
}
