package com.example.loginreg.service;

import com.example.loginreg.dto.PaymentDTO;
import com.example.loginreg.entity.Appointment;
import com.example.loginreg.entity.Payment;
import com.example.loginreg.entity.User;
import com.example.loginreg.repository.AppointmentRepository;
import com.example.loginreg.repository.PaymentRepository;
import com.example.loginreg.repository.UserRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

   @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository; 

    @Autowired
    private EmailService emailService;

    @Override
    public void savePayment(PaymentDTO paymentDTO) {
        try {
            // Fetch appointment by appointment ID to get the patient name
            String appointmentId = paymentDTO.getAppointmentId();
            Appointment appointment = appointmentRepository.findById(appointmentId).orElse(null);

            if (appointment != null) {
                // Create Payment entity and populate fields
                Payment payment = new Payment();
                payment.setToken(paymentDTO.getToken());
                payment.setAppointmentId(appointmentId);
                payment.setStatus("paid");

                // Set patient name, test name, and test price from the appointment details
                payment.setPatientName(appointment.getPatientName());
                payment.setTestName(appointment.getTest());
                payment.setTestPrice(appointment.getTestPrice());

                // Fetch user by patient name to get the email address
                String patientName = appointment.getPatientName();
                User user = userRepository.findByName(patientName);

                if (user != null) {
                    String emailAddress = user.getEmail();
                    payment.setEmailAddress(emailAddress);

                    // Save payment entity
                    paymentRepository.save(payment);

                    // Send receipt email
                    sendReceipt(payment);
                } else {
                    throw new RuntimeException("User not found for patient name: " + patientName);
                }
            } else {
                throw new RuntimeException("Appointment not found for ID: " + appointmentId);
            }
        } catch (Exception e) {
            e.printStackTrace();
            
        }
    }


    private void sendReceipt(Payment payment) {
        String to = payment.getEmailAddress();
        String subject = "Payment Receipt";
        String body = "<html>"
                + "<body style='font-family: Arial, sans-serif;'>"
                + "<h2>Dear " + payment.getPatientName() + ",</h2>"
                + "<p>Thank you for your payment. Below are the details of your transaction:</p>"
                + "<ul>"
                + "<li><strong>Appointment ID:</strong> " + payment.getAppointmentId() + "</li>"
                + "<li><strong>Test Name:</strong> " + payment.getTestName() + "</li>"
                + "<li><strong>Test Price:</strong> $" + payment.getTestPrice() + "</li>"
                + "<li><strong>Payment Status:</strong> " + payment.getStatus() + "</li>"
                + "</ul>"
                + "<p>Regards,<br/>Your Healthcare Team ABC Laboratories</p>"
                + "</body>"
                + "</html>";
    
        try {
            emailService.sendEmail(to, subject, body); 
            System.out.println("Email sent successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}































