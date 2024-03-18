package com.example.loginreg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import com.example.loginreg.repository.UserRepository;
import com.example.loginreg.entity.User;
import com.example.loginreg.dto.UserDto;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public void saveUser(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setAge(userDto.getAge());
        user.setContact(userDto.getContact());
        user.setGender(userDto.getGender());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setRole(userDto.getRole());
        
        userRepository.save(user);
    }

    @Override
    public UserDto findByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return user != null ? mapToUserDto(user) : null;
    }

    @Override
    public UserDto findByName(String name) {
        User user = userRepository.findByName(name);
        return user != null ? mapToUserDto(user) : null;
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToUserDto).collect(Collectors.toList());
    }

    @Override
    public UserDto findUserById(String id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(this::mapToUserDto).orElse(null);
    }

    @Override
    public UserDto updateUser(String id, UserDto userDto) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setId(userDto.getId());
            user.setName(userDto.getName());
            user.setAge(userDto.getAge());
            user.setContact(userDto.getContact());
            user.setGender(userDto.getGender());
            user.setEmail(userDto.getEmail());
            user.setUsername(userDto.getUsername());
            user.setPassword(userDto.getPassword());
            userRepository.save(user);
            return mapToUserDto(user);
        }
        return null;
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }

    @Override
    public List<UserDto> findUsersByRole(String role) {
    List<User> users = userRepository.findByRole(role);
    return users.stream().map(this::mapToUserDto).collect(Collectors.toList());
}


    private UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setAge(user.getAge());
        userDto.setContact(user.getContact());
        userDto.setGender(user.getGender());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setRole(user.getRole());
        return userDto;
    }
}



