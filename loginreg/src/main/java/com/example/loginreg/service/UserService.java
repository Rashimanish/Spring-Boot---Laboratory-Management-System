package com.example.loginreg.service;

import java.util.List;

import com.example.loginreg.dto.UserDto;

public interface UserService {

    public void saveUser(UserDto userDto);
    UserDto findByUsername(String username);
    List<UserDto> findAllUsers();
    UserDto findUserById(String id);
    List<UserDto> findUsersByRole(String role);
    UserDto updateUser(String id, UserDto userDto);
    void deleteUser(String id);
    boolean authenticateUser(String username, String password);
    
    
} 



 