package com.example.loginreg.factory;



public class AppointmentNumberFactory {

    private static int emergencyCounter = 0;
    private static int regularCounter = 0;

    public static String generateAppointmentNumber(String type) {
        if (type.equalsIgnoreCase("emergency")) {
            return "E" + generateNumericSuffix("emergency");
        } else {
            return "R" + generateNumericSuffix("regular");
        }
    }

    private static synchronized String generateNumericSuffix(String type) {
        if (type.equalsIgnoreCase("emergency")) {
            emergencyCounter++;
            return String.format("%03d", emergencyCounter);
        } else {
            regularCounter++;
            return String.format("%03d", regularCounter);
        }
    }


    
}
