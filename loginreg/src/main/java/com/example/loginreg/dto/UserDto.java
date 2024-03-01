package com.example.loginreg.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDto {
    private String id;
    private String name;
    private int age;
    private String contact;
    private String gender;
    private String email;
    private String username;
    private String password;
    private String role;
}
