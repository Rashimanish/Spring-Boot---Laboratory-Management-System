package com.example.loginreg.service;

import java.util.HashMap;

import org.springframework.stereotype.Component;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;


import java.util.Map;

@Component
public class StripeClient {

    private final String apiKey;

    public StripeClient() {
        this.apiKey = "sk_test_51OtoQ3LjhdK8oyAchb4hAQEC8FZzHtzwE2GfVaKpE7cmbUscwqcVa47yBHeVFmkHVqxVQjdNQ139aAbw9QSHRrPH00QDkzO6Jf";
        Stripe.apiKey = apiKey;
    }

    public Charge chargeNewCard(String token, double amount) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", (int) (amount * 100));
        chargeParams.put("currency", "USD");
        chargeParams.put("source", token);
        return Charge.create(chargeParams);
    }

    public Customer createCustomer(String token, String email) throws StripeException {
        Map<String, Object> customerParams = new HashMap<>();
        customerParams.put("email", email);
        customerParams.put("source", token);
        return Customer.create(customerParams);
    }

    public Charge chargeCustomerCard(String customerId, int amount) throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", amount);
        chargeParams.put("currency", "USD");
        chargeParams.put("customer", customerId);
        return Charge.create(chargeParams);
    }
}
