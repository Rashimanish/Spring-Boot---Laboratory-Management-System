package com.example.loginreg.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.loginreg.service.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/payment")
public class PaymentGatewayController {

    private final StripeClient stripeClient;
    public PaymentGatewayController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    public Charge chargeCard(@RequestHeader("token") String token, @RequestHeader("amount") double amount) throws StripeException {
        return stripeClient.chargeNewCard(token, amount);
    }
    
}
