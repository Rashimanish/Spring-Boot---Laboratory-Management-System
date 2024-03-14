package com.example.loginreg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import com.example.loginreg.dto.TestDTO;
import com.example.loginreg.entity.Test;
import com.example.loginreg.repository.TestRepository;

@Service
public class TestServiceImpl implements TestService{

    @Autowired
    private TestRepository testRepository;

    private final ModelMapper modelMapper;

     public TestServiceImpl() {
        this.modelMapper = new ModelMapper();
    }

    public List<TestDTO> getAllTests() {
        List<Test> tests = testRepository.findAll();
        return tests.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TestDTO getTestById(String id) {
        return testRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public TestDTO addTest(TestDTO testDTO) {
        testDTO.setTestCode(generateTestCode());
        Test test = convertToEntity(testDTO);
        Test savedTest = testRepository.save(test);
        return convertToDTO(savedTest);
    }
    public void deleteTest(String id) {
        testRepository.deleteById(id);
    }

    public TestDTO updateTest(String id, TestDTO testDTO) {
        Test test = testRepository.findById(id).orElse(null);
        if (test != null && testDTO != null) {
            test.setTestName(testDTO.getTestName());
            test.setPrice(testDTO.getPrice());
            test.setTestCode(testDTO.getTestCode());
            testRepository.save(test);
            return convertToDTO(test);
        }
        return null;
    }

    private TestDTO convertToDTO(Test test) {
        return modelMapper.map(test, TestDTO.class);
    }

    private Test convertToEntity(TestDTO testDTO) {
        return modelMapper.map(testDTO, Test.class);
    }

    private String generateTestCode() {
        Test lastTest = testRepository.findTopByOrderByTestCodeDesc();
        if (lastTest == null) {
            return "T001"; // Set the first test code if no tests exist
        } else {
            int nextNumber = Integer.parseInt(lastTest.getTestCode().substring(1)) + 1;
            return String.format("T%03d", nextNumber);
        }
    }

    @Override
    public double getTestPriceByName(String testName) {
        Test test = testRepository.findByTestName(testName);
        return test != null ? test.getPrice() : 0; 
    }
    
}
