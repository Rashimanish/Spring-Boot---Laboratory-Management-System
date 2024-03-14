package com.example.loginreg.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.PaymentDTO;


@Service
public interface PaymentService  {
     ResponseEntity<String> makePayment(PaymentDTO paymentDTO);

    
}
