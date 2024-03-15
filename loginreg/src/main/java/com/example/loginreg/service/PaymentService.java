package com.example.loginreg.service;

import org.springframework.stereotype.Service;

import com.example.loginreg.dto.PaymentDTO;


@Service
public interface PaymentService  {
     
     void savePayment(PaymentDTO paymentDTO);
    
}
