package com.example.loginreg.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.User;

@Repository
public interface UserRepository extends MongoRepository <User, String> {
    User findByUsername(String username);
    
}
