package com.example.loginreg.service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import com.example.loginreg.repository.RoleRepository;
import com.example.loginreg.repository.UserRepository;
import com.example.loginreg.entity.User; 
import com.example.loginreg.entity.Role; 
import com.example.loginreg.dto.UserDto;

@Service
public class UserServiceImpl implements UserService{

   
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    

    
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void savePatient(UserDto userDto) {
        saveUserWithRole(userDto, "ROLE_PATIENT");
    }

    @Override
    public void saveUserWithRole(UserDto userDto, String roleName) {
        User user = new User();
        user.setName(userDto.getName());
        user.setAge(userDto.getAge());
        user.setContact(userDto.getContact());
        user.setGender(userDto.getGender());
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword((userDto.getPassword()));

        Role role = roleRepository.findByName(roleName);
        if (role == null) {
            role = createRole(roleName);
        }
        user.setRole(Collections.singletonList(role));

        userRepository.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserDto> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserDto)
                .collect(Collectors.toList());
    }

    public UserDto mapToUserDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setName(user.getName());
        userDto.setAge(user.getAge());
        userDto.setContact(user.getContact());
        userDto.setGender(user.getGender());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        // Extract role names from Role objects and set them in the UserDto
        List<String> roleNames = user.getRole().stream()
                .map(role -> role.getName()) // Extract role names
                .collect(Collectors.toList());
        userDto.setRoles(roleNames);
        return userDto;
    }
    


    private Role createRole(String roleName) {
        Role role = new Role();
        role.setName(roleName);
        return roleRepository.save(role);
    }
    
    @Override
    public boolean authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }
}

