package com.example.loginreg.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.TestResultDTO;
import com.example.loginreg.entity.Test;
import com.example.loginreg.entity.TestResult;
import com.example.loginreg.repository.TestRepository;
import com.example.loginreg.repository.TestResultRepository;


@Service
public class TestResultServiceImpl implements TestResultService{

     @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private TestRepository testRepository;

    @Override
    public TestResultDTO createTestResult(TestResultDTO testResultDTO) {
        Test test = testRepository.findByTestName(testResultDTO.getTestName());
        if (test != null) {
            // Fetch the testCode from the test object and set it in the DTO
            testResultDTO.setTestCode(test.getTestCode());
            TestResult testResult = convertToEntity(testResultDTO);
            testResultRepository.save(testResult);
            return testResultDTO;
        }
        return null;
    }

    @Override
    public List<TestResultDTO> getAllTestResults() {
        List<TestResult> testResults = testResultRepository.findAll();
        return testResults.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public List<TestResultDTO> getTestResultsByUser(String username) {
        List<TestResult> testResults = testResultRepository.findByPatientName(username);
        return testResults.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TestResult convertToEntity(TestResultDTO testResultDTO) {
        TestResult testResult = new TestResult();
        testResult.setAppointmentId(testResultDTO.getAppointmentId());
        testResult.setAppointmentType(testResultDTO.getAppointmentType());
        testResult.setAppointmentNumber(testResultDTO.getAppointmentNumber());
        testResult.setAppointmentDateTime(testResultDTO.getAppointmentDateTime());
        testResult.setPatientName(testResultDTO.getPatientName());
        testResult.setTestName(testResultDTO.getTestName());
        testResult.setTestCode(testResultDTO.getTestCode());
        testResult.setTechnician(testResultDTO.getTechnician());
        testResult.setTestRange(testResultDTO.getTestRange());
        testResult.setRemark(testResultDTO.getRemark());
        testResult.setDescription(testResultDTO.getDescription());
        return testResult;
    }
    private TestResultDTO convertToDTO(TestResult testResult) {
        TestResultDTO testResultDTO = new TestResultDTO();
        testResultDTO.setAppointmentId(testResult.getAppointmentId());
        testResultDTO.setAppointmentType(testResult.getAppointmentType());
        testResultDTO.setAppointmentNumber(testResult.getAppointmentNumber());
        testResultDTO.setAppointmentDateTime(testResult.getAppointmentDateTime());
        testResultDTO.setPatientName(testResult.getPatientName());
        testResultDTO.setTestName(testResult.getTestName());
        testResultDTO.setTechnician(testResult.getTechnician());
        testResultDTO.setTestCode(testResult.getTestCode());
        testResultDTO.setTestRange(testResult.getTestRange());
        testResultDTO.setRemark(testResult.getRemark());
        testResultDTO.setDescription(testResult.getDescription());
        return testResultDTO;
    }
}
    

