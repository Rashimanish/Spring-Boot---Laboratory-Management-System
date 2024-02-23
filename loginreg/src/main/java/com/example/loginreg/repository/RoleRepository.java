package com.example.loginreg.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.loginreg.entity.Role;

@Repository
public interface RoleRepository extends MongoRepository <Role, String>{

    Role findByName(String name);
    
}
