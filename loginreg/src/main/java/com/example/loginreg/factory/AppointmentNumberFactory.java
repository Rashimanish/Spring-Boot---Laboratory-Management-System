package com.example.loginreg.factory;

import java.util.Random;

public class AppointmentNumberFactory {
    private static final int RANDOM_DIGITS = 3;

    public static String generateAppointmentNumber(String type) {
        AppointmentNumberGenerator generator;
        if (type.equalsIgnoreCase("emergency")) {
            generator = new EmergencyAppointmentNumberGenerator();
        } else {
            generator = new RegularAppointmentNumberGenerator();
        }
        return generator.generate();
    }

    private interface AppointmentNumberGenerator {
        String generate();
    }

    private static class EmergencyAppointmentNumberGenerator implements AppointmentNumberGenerator {
        @Override
        public String generate() {
            return "E" + generateRandomDigits(RANDOM_DIGITS);
        }
    }

    private static class RegularAppointmentNumberGenerator implements AppointmentNumberGenerator {
        @Override
        public String generate() {
            return "R" + generateRandomDigits(RANDOM_DIGITS);
        }
    }

    private static String generateRandomDigits(int numDigits) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(numDigits);
        for (int i = 0; i < numDigits; i++) {
            sb.append(random.nextInt(10)); 
        }
        return sb.toString();
    }
}
