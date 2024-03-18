package com.example.loginreg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.dto.PaymentDTO;
import com.example.loginreg.service.PaymentService;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    @Autowired
    PaymentService paymentService;

    @PostMapping("/save")
    public void chargeCard(@RequestBody PaymentDTO paymentDTO) {
        paymentService.savePayment(paymentDTO);

    }
    
}
