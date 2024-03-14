package com.example.loginreg.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.loginreg.dto.PaymentDTO;
import com.example.loginreg.entity.Payment;
import com.example.loginreg.entity.User;
import com.example.loginreg.repository.PaymentRepository;
import com.example.loginreg.repository.UserRepository;



@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<String> makePayment(PaymentDTO paymentDTO) {
        try {
            Double testPrice = paymentDTO.getTestPrice();
            if (testPrice == null || testPrice <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Test price is invalid");
            }

            // Fetch user information from the database to get the email address
            User user = userRepository.findByUsername(paymentDTO.getPatientName());
            if (user != null) {
                paymentDTO.setEmailAddress(user.getEmail());

                // Save payment information to the database
                savePaymentInfo(paymentDTO);

                // Send receipt
                sendReceipt(paymentDTO);

                // Return success response with payment status
                return ResponseEntity.ok("Payment request received and is being processed.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
            }

        } catch (Exception e) {
            // Log and handle exceptions
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment failed: Internal server error");
        }
    }

    private void sendReceipt(PaymentDTO paymentDTO) {
        String to = paymentDTO.getEmailAddress();
        String subject = "Payment Receipt";
        String body = "Dear " + paymentDTO.getPatientName() + ",\n\n"
                + "Thank you for your payment. Below are the details of your transaction:\n"
                + "Appointment ID: " + paymentDTO.getAppointmentId() + "\n"
                + "Test Name: " + paymentDTO.getTestName() + "\n"
                + "Test Price: $" + paymentDTO.getTestPrice() + "\n"
                + "Payment Status: Processing\n" // Payment status set to "Processing"
                + "Regards,\n"
                + "Your Healthcare Team";

        try {
            emailService.sendEmail(to, subject, body);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void savePaymentInfo(PaymentDTO paymentDTO) {
        // Your logic to save payment information to the database
        // Example: Use MongoDB to save payment details
        Payment payment = new Payment();
        payment.setAppointmentId(paymentDTO.getAppointmentId());
        payment.setTestName(paymentDTO.getTestName());
        payment.setPatientName(paymentDTO.getPatientName());
        payment.setTestPrice(paymentDTO.getTestPrice());
        payment.setStatus("processing"); // Default status is set to "processing"
        paymentRepository.save(payment);
    }
}
   



/* private void ChargeCard(PaymentDTO paymentDTO) throws StripeException {

        // Charge the card
        Charge charge = stripeClient.chargeNewCard(paymentDTO.getToken(), paymentDTO.getTestPrice());
        // Update payment status based on charge result
        String paymentStatus;
        if (charge != null && "succeeded".equals(charge.getStatus())) {
            paymentStatus = "PAID";
        } else if (charge != null && "failed".equals(charge.getStatus())) {
            paymentStatus = "FAILED";
        } else {
            paymentStatus = "N/A";
        }

    }*/
    

























/* @Override
    public ResponseEntity<String> makePayment(PaymentDTO paymentDTO) {
        try {
            // Charge the card using StripeClient
            Charge charge = stripeClient.chargeNewCard(paymentDTO.getToken(), paymentDTO.getTestPrice());

            // Check if the charge status is successful
            if (charge != null && charge.getStatus().equals("succeeded")) {
                // Fetch user information from the database to get the email address
                User user = userRepository.findByUsername(paymentDTO.getPatientName());
                if (user != null) {
                    paymentDTO.setEmailAddress(user.getEmail());
                }

                // Save payment details
                Payment payment = new Payment();
                payment.setToken(paymentDTO.getToken());
                payment.setAppointmentId(paymentDTO.getAppointmentId());
                payment.setTestName(paymentDTO.getTestName());
                payment.setPatientName(paymentDTO.getPatientName());
                payment.setTestPrice(paymentDTO.getTestPrice());
                payment.setEmailAddress(paymentDTO.getEmailAddress());
                payment.setStatus("PAID");
                paymentRepository.save(payment);

                // Send receipt
                sendReceipt(paymentDTO);

                return new ResponseEntity<>("Payment successful", HttpStatus.OK);
            } else {
                // Charge was not successful
                updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
                return new ResponseEntity<>("Payment failed", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (StripeException e) {
            // Handle Stripe exceptions
            e.printStackTrace();
            // Update payment status to FAILED in case of StripeException
            updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
            return new ResponseEntity<>("Payment failed", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            e.printStackTrace();
            // Handle other exceptions
            // You might want to update payment status to a relevant status indicating failure
            updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
            return new ResponseEntity<>("Payment failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void sendReceipt(PaymentDTO paymentDTO) {
        String to = paymentDTO.getEmailAddress();
        String subject = "Payment Receipt";
        String body = "Dear " + paymentDTO.getPatientName() + ",\n\n"
                + "Thank you for your payment. Below are the details of your transaction:\n"
                + "Appointment ID: " + paymentDTO.getAppointmentId() + "\n"
                + "Test Name: " + paymentDTO.getTestName() + "\n"
                + "Test Price: $" + paymentDTO.getTestPrice() + "\n"
                + "Regards,\n"
                + "Your Healthcare Team";

        try {
            emailService.sendEmail(to, subject, body);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void updatePaymentStatus(String appointmentId, String status) {
        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
        if (payment != null) {
            payment.setStatus(status);
            paymentRepository.save(payment);
        }
    } */



    /* =======================@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private StripeClient stripeClient;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private EmailService emailService; // Inject EmailService

    @Autowired
    private UserRepository userRepository; // Inject UserRepository

    @Override
    public ResponseEntity<?> makePayment(PaymentDTO paymentDTO) {
        try {
            // Check for null testPrice
            Double testPrice = paymentDTO.getTestPrice();
            if (testPrice == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Test price cannot be null");
            }

            // Charge the card using StripeClient
            Charge charge = stripeClient.chargeNewCard(paymentDTO.getToken(), testPrice);

            // Check if the charge status is successful
            if (charge != null && "succeeded".equals(charge.getStatus())) {
                // Save payment details
                Payment payment = new Payment();
                payment.setToken(paymentDTO.getToken());
                payment.setAppointmentId(paymentDTO.getAppointmentId());
                payment.setTestName(paymentDTO.getTestName());
                payment.setPatientName(paymentDTO.getPatientName());
                payment.setTestPrice(testPrice);
                payment.setStatus("PAID");
                paymentRepository.save(payment);

                // Fetch user information from the database to get the email address
                User user = userRepository.findByUsername(paymentDTO.getPatientName());
                if (user != null) {
                    paymentDTO.setEmailAddress(user.getEmail());
                }

                // Send email receipt to the patient
                sendReceipt(paymentDTO);

                // Return a custom success response with payment details
                PaymentSuccessResponse successResponse = new PaymentSuccessResponse();
                successResponse.setPaymentId(payment.getId());
                successResponse.setTestName(payment.getTestName());
                successResponse.setTestPrice(payment.getTestPrice());
                successResponse.setStatus(payment.getStatus());

                return ResponseEntity.ok(successResponse);
            } else {
                // Charge was not successful
                updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment failed");
            }
        } catch (StripeException e) {
            // Handle Stripe exceptions
            e.printStackTrace();
            // Update payment status to FAILED in case of StripeException
            updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment failed");
        } catch (Exception e) {
            e.printStackTrace();
            // Handle other exceptions
            // You might want to update payment status to a relevant status indicating failure
            updatePaymentStatus(paymentDTO.getAppointmentId(), "FAILED");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment failed");
        }
    }

    private void updatePaymentStatus(String appointmentId, String status) {
        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
        if (payment != null) {
            payment.setStatus(status);
            paymentRepository.save(payment);
        }
    }

    private void sendReceipt(PaymentDTO paymentDTO) {
        String to = paymentDTO.getEmailAddress();
        String subject = "Payment Receipt";
        String body = "Dear " + paymentDTO.getPatientName() + ",\n\n"
                + "Thank you for your payment. Below are the details of your transaction:\n"
                + "Appointment ID: " + paymentDTO.getAppointmentId() + "\n"
                + "Test Name: " + paymentDTO.getTestName() + "\n"
                + "Test Price: $" + paymentDTO.getTestPrice() + "\n"
                + "Regards,\n"
                + "Your Healthcare Team";

        try {
            emailService.sendEmail(to, subject, body);
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
*/