package com.example.loginreg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.dto.TestResultDTO;
import com.example.loginreg.service.TestResultService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/result")
public class TestResultController {

     @Autowired
    private TestResultService testResultService;

    @PostMapping("/create")
    public TestResultDTO createTestResult(@RequestBody TestResultDTO testResultDTO) {
        return testResultService.createTestResult(testResultDTO);
    }

    @GetMapping("/viewAll")
    public List<TestResultDTO> getAllTestResults() {
        return testResultService.getAllTestResults();
    }

     @GetMapping("/viewByUser/{username}")
    public ResponseEntity<List<TestResultDTO>> getTestResultsByUser(@PathVariable String username) {
        List<TestResultDTO> testResults = testResultService.getTestResultsByUser(username);
        if (testResults.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(testResults, HttpStatus.OK);
    }
    
}
