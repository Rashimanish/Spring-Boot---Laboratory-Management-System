package com.example.loginreg.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.loginreg.entity.Test;

@Repository
public interface TestRepository extends MongoRepository <Test , String> {

    Test findTopByOrderByTestCodeDesc();

    
}
