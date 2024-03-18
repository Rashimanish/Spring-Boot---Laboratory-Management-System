package com.example.loginreg.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.loginreg.dto.LoginRequestDTO;
import com.example.loginreg.dto.UserDto;
import com.example.loginreg.service.UserService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.saveUser(userDto);
            return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody LoginRequestDTO loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        boolean isAuthenticated = userService.authenticateUser(username, password);
        if (isAuthenticated) {
            UserDto user = userService.findByUsername(username);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<String> findByUsername(HttpServletRequest request) {

        String username = request.getUserPrincipal().getName();

        return ResponseEntity.ok("Welcome " + username);
    }

    @GetMapping("/viewusers")
    public List<UserDto> findAllUsers() {
        return userService.findAllUsers();
    }

    @PutMapping("/updateuser/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable String id, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(id, userDto);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteuser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("User deletion failed: " + e.getMessage());
        }
    }

    @GetMapping("/getTechnicians")
    public List<UserDto> getTechnicians() {
        return userService.findUsersByRole("Technician");
    }

}