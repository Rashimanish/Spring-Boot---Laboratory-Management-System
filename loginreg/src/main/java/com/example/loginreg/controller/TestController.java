package com.example.loginreg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.dto.TestDTO;
import com.example.loginreg.service.TestService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/tests")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping("/viewall")
    public ResponseEntity<List<TestDTO>> getAllTests() {
        try {
            List<TestDTO> tests = testService.getAllTests();
            return new ResponseEntity<>(tests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TestDTO> getTestById(@PathVariable String id) {
        try {
            TestDTO testDTO = testService.getTestById(id);
            if (testDTO != null) {
                return new ResponseEntity<>(testDTO, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addtest")
    public ResponseEntity<TestDTO> addTest(@RequestBody TestDTO testDTO) {
        try {
            TestDTO savedTest = testService.addTest(testDTO);
            return new ResponseEntity<>(savedTest, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteTest(@PathVariable String id) {
    try {
        testService.deleteTest(id);
        return new ResponseEntity<>("Test deleted successfully", HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>("Error deleting test", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@PutMapping("/update/{id}")
public ResponseEntity<TestDTO> updateTest(@PathVariable String id, @RequestBody TestDTO testDTO) {
    try {
        TestDTO updatedTest = testService.updateTest(id, testDTO);
        if (updatedTest != null) {
            return new ResponseEntity<>(updatedTest, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
}