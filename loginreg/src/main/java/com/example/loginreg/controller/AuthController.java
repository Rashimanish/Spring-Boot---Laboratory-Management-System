package com.example.loginreg.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.loginreg.dto.UserDto;
import com.example.loginreg.service.UserService;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/auth")
public class AuthController {

   @Autowired
   private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.savePatient(userDto);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Registration failed: " + e.getMessage());
        }
    }
    /* 

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestParam("username") String username, @RequestParam("password") String password) {
        // Implement login logic
        boolean isAuthenticated = userService.authenticateUser(username, password);
        if (isAuthenticated) {
            return new ResponseEntity<>("User logged in successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/users")
    public List<UserDto> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/users/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if (user != null) {
            UserDto userDto = userService.mapToUserDto(user);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        } else {
            // Handle user not found case
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    */
}

    

