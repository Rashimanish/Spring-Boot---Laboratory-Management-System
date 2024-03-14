package com.example.loginreg.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.loginreg.dto.PaymentDTO;
import com.example.loginreg.service.PaymentService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("api/pay")
public class PaymentContoller {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/make")
    public ResponseEntity<String> makePayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            // Make payment request to Stripe and handle database update and email sending internally
            ResponseEntity<String> successMessage = paymentService.makePayment(paymentDTO);

            // Return success response to the client
            return successMessage;
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during payment.");
        }
    }
 }


   





/* 
   


    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest paymentRequest) {
        try {
            Stripe.apiKey = stripeSecretKey;

            Map<String, Object> params = new HashMap<>();
            params.put("payment_method_types", new String[]{"card"});
            params.put("line_items", new Object[]{
                    new HashMap<String, Object>() {{
                        put("price_data", new HashMap<String, Object>() {{
                            put("currency", "usd");
                            put("product_data", new HashMap<String, Object>() {{
                                put("name", paymentRequest.getTestName());
                            }});
                            put("unit_amount", Math.round(paymentRequest.getTestPrice() * 100)); // Amount in cents
                        }});
                        put("quantity", 1);
                    }}
            });
            params.put("mode", "payment");
            params.put("success_url", "http://localhost:3000/success?appointmentId=" + paymentRequest.getAppointmentId());
            params.put("cancel_url", "http://localhost:3000/cancel");
            Session session = Session.create(params);

            // Serialize the session object to JSON using Jackson
            String sessionJson = objectMapper.writeValueAsString(session);

            return ResponseEntity.ok().body(sessionJson);
        } catch (StripeException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "Failed to initiate payment."));
        }
    }
     }
     
     ====================
     
      @Autowired PaymentService paymentService;

    @PostMapping("/charge")
    public ResponseEntity<?> makePayment(@RequestBody PaymentDTO paymentDTO) {
        try {
            ResponseEntity<?> response = paymentService.makePayment(paymentDTO);
            return response;

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during payment.");
        }
    */