package com.example.loginreg.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.TestDTO;

@Service
public interface TestService {

    List<TestDTO> getAllTests();

    TestDTO getTestById(String id);

    TestDTO addTest(TestDTO testDTO);

    void deleteTest(String testCode);

    TestDTO updateTest(String id, TestDTO testDTO);
    
    double getTestPriceByName(String testName);

    
}
