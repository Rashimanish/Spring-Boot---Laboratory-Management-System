package com.example.loginreg.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.loginreg.dto.UserDto;
import com.example.loginreg.entity.User;
import com.example.loginreg.service.UserService;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserDto userDto) {
        userService.savePatient(userDto); 
        // Redirect to login page after registration
        return "redirect:/api/auth/login";
    }

    @GetMapping("/login")
    public void loginUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        // Implement login logic
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{username}")
    public UserDto getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            return userService.mapToUserDto(user);
        } else {
            // Handle user not found case
            return null;
        }
    }

    
}
