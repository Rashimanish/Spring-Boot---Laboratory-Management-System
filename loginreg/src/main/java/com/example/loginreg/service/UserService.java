package com.example.loginreg.service;

import java.util.List;

import com.example.loginreg.dto.UserDto;
import com.example.loginreg.entity.User;


public interface UserService {

    void savePatient(UserDto userDto);

    void saveUserWithRole(UserDto userDto, String roleName);

    User findByUsername(String username);

    List<UserDto> findAllUsers();
    
    UserDto mapToUserDto(User user);

    public boolean authenticateUser(String username, String password);

    
} 